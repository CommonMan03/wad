# Exp4-B AWS hosting (Elastic Beanstalk quick steps)

1. Zip app files (`package.json`, `server.js`, `public/`, `Procfile`).
2. AWS Console → Elastic Beanstalk → Create environment (Node.js platform).
3. Upload zip.
4. Set environment variable `MONGODB_URI` in Configuration.
5. Deploy and open generated URL.

VPC note:
- For private DB access, run EB in same VPC/subnets and allow security group access.
