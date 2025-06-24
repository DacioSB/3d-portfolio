# AWS S3 + CloudFront Optimization for 3D Portfolio

## Current Setup Issues
Your site is hosted on S3 without compression or proper caching headers, causing:
- 2.6MB of uncompressed text assets
- Poor cache utilization
- Slow loading times

## Recommended AWS Architecture

```
User → CloudFront (CDN) → S3 Bucket
```

## Step 1: CloudFront Distribution Setup

### Create CloudFront Distribution:
```bash
# AWS CLI command to create distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### CloudFront Configuration (cloudfront-config.json):
```json
{
  "CallerReference": "3d-portfolio-$(date +%s)",
  "Comment": "3D Portfolio CDN",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-3d-portfolio",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    "OriginRequestPolicyId": "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-3d-portfolio",
        "DomainName": "3d-portfolio-docitu.s3.us-east-1.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

## Step 2: S3 Bucket Optimization

### Enable Static Website Hosting:
```bash
aws s3 website s3://3d-portfolio-docitu --index-document index.html --error-document index.html
```

### Set Proper Content-Type Headers:
```bash
# Upload with correct MIME types
aws s3 cp dist/ s3://3d-portfolio-docitu/ --recursive \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000" \
  --content-encoding gzip
```

## Step 3: Build Process Optimization

### Update package.json:
```json
{
  "scripts": {
    "build": "vite build",
    "build:optimized": "vite build && npm run compress && npm run deploy",
    "compress": "gzip -9 -r dist/",
    "deploy": "aws s3 sync dist/ s3://3d-portfolio-docitu/ --delete --cache-control 'public, max-age=31536000'"
  }
}
```

### Vite Build with Compression:
```javascript
// vite.config.js - Add compression plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['@react-three/fiber', '@react-three/drei'],
          'animation': ['framer-motion'],
          'ui': ['react-tilt', 'react-parallax-tilt', 'react-vertical-timeline-component'],
          'email': ['@emailjs/browser']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    compress: true
  }
})
```

## Step 4: Image Optimization Script

### Create image optimization script:
```bash
#!/bin/bash
# optimize-images.sh

echo "Optimizing images for web..."

# Install imagemagick if not present
# sudo apt-get install imagemagick

# Optimize hero background (7.8MB → ~1MB)
convert src/assets/rm251-mind-15.jpg -quality 85 -resize 1920x1080 -format webp src/assets/rm251-mind-15.webp

# Optimize project images
for img in src/assets/*.png src/assets/*.jpg; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    name="${filename%.*}"
    convert "$img" -quality 85 -format webp "src/assets/${name}.webp"
    echo "Optimized: $img → ${name}.webp"
  fi
done

echo "Image optimization complete!"
```

## Step 5: Update Tailwind Config for WebP

```javascript
// tailwind.config.js
export const theme = {
  extend: {
    backgroundImage: {
      "hero-pattern": "url('/src/assets/rm251-mind-15.webp')",
    },
  },
};
```

## Step 6: CloudFront Cache Behaviors

### Configure different cache behaviors:
```json
{
  "CacheBehaviors": {
    "Quantity": 3,
    "Items": [
      {
        "PathPattern": "*.js",
        "TargetOriginId": "S3-3d-portfolio",
        "ViewerProtocolPolicy": "redirect-to-https",
        "Compress": true,
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        "TTL": 31536000
      },
      {
        "PathPattern": "*.css",
        "TargetOriginId": "S3-3d-portfolio",
        "ViewerProtocolPolicy": "redirect-to-https",
        "Compress": true,
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        "TTL": 31536000
      },
      {
        "PathPattern": "*.gltf",
        "TargetOriginId": "S3-3d-portfolio",
        "ViewerProtocolPolicy": "redirect-to-https",
        "Compress": true,
        "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        "TTL": 2592000
      }
    ]
  }
}
```

## Step 7: Deployment Script

### Create automated deployment:
```bash
#!/bin/bash
# deploy.sh

echo "Building optimized 3D portfolio..."

# Build the project
npm run build

# Optimize images
./optimize-images.sh

# Compress assets
find dist -name "*.js" -exec gzip -9 {} \; -exec mv {}.gz {} \;
find dist -name "*.css" -exec gzip -9 {} \; -exec mv {}.gz {} \;
find dist -name "*.html" -exec gzip -9 {} \; -exec mv {}.gz {} \;

# Upload to S3 with proper headers
aws s3 sync dist/ s3://3d-portfolio-docitu/ \
  --delete \
  --cache-control "public, max-age=31536000" \
  --content-encoding gzip \
  --metadata-directive REPLACE

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

## Expected Performance Improvements

### Before Optimization:
- **Mobile Score**: 29/100
- **Hero Background**: 7.8MB
- **Total Assets**: ~12MB
- **No Compression**: 2.6MB wasted
- **No CDN**: Slow global loading

### After Optimization:
- **Mobile Score**: 70+/100
- **Hero Background**: ~1MB (WebP)
- **Total Assets**: ~3MB
- **Compression**: 2.6MB saved
- **CDN**: Fast global delivery

## Implementation Checklist

- [ ] Create CloudFront distribution
- [ ] Configure S3 bucket policies
- [ ] Optimize images to WebP format
- [ ] Update build process with compression
- [ ] Set up automated deployment
- [ ] Configure proper cache headers
- [ ] Test performance improvements
- [ ] Monitor with CloudWatch

## Cost Estimation

### CloudFront Pricing (US East):
- First 10TB: $0.085/GB
- Estimated monthly cost: $5-15 for typical traffic

### S3 Storage:
- Reduced from ~12MB to ~3MB per deployment
- Minimal cost impact

### Total Monthly Cost: $5-20 (significant performance gain)

## Monitoring & Analytics

### CloudWatch Metrics to Monitor:
- Cache Hit Ratio (target: >90%)
- Origin Response Time
- 4xx/5xx Error Rates
- Data Transfer

### Performance Testing:
```bash
# Test before and after
lighthouse https://your-domain.com --output json
```

This optimization should improve your mobile performance score from 29 to 70+ and desktop from ~50 to 85+.
