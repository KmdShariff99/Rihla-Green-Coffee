# Rihla Global - AWS EC2 Deployment Guide

This guide walks you through deploying the Rihla Global website on your AWS EC2 instance.

## Prerequisites

- AWS EC2 instance running Ubuntu 22.04 or 20.04 LTS
- SSH access to your EC2 instance
- Domain name pointed to your EC2's Elastic IP
- Security group configured with ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

---

## Step 1: Connect to Your EC2 Instance

```bash
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

---

## Step 2: Install Node.js

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.nvm/nvm.sh

# Install Node.js 18 LTS
nvm install 18
nvm use 18
nvm alias default 18

# Verify installation
node -v  # Should show v18.x.x
npm -v
```

---

## Step 3: Install PM2 Process Manager

```bash
npm install -g pm2
```

---

## Step 4: Clone the Repository

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/rihla-global.git
cd rihla-global
```

---

## Step 5: Configure Environment Variables

```bash
# Copy the example environment file
cp deploy/.env.example .env

# Edit with your values
nano .env
```

**Required variables:**
- `SESSION_SECRET`: Generate with `openssl rand -base64 32`
- `OPENAI_API_KEY`: Your OpenAI API key (for chatbot functionality)

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

---

## Step 6: Build the Application

```bash
# Make build script executable and run it
chmod +x deploy/build-production.sh
./deploy/build-production.sh
```

---

## Step 7: Start the Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs rihla-global

# Save PM2 process list (survives reboot)
pm2 save

# Enable PM2 to start on system boot
pm2 startup
# Follow the command it outputs (copy and run it)
```

---

## Step 8: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Copy the configuration file
sudo cp deploy/nginx.conf /etc/nginx/sites-available/rihla-global

# Edit the configuration to use your domain
sudo nano /etc/nginx/sites-available/rihla-global
# Replace "your-domain.com" with your actual domain

# Enable the site
sudo ln -s /etc/nginx/sites-available/rihla-global /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Step 9: Set Up SSL with Let's Encrypt (Free HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## Step 10: Verify Deployment

1. Visit your domain in a browser: `https://your-domain.com`
2. Test the contact form
3. Test the AI chatbot
4. Test WhatsApp links

---

## Useful Commands

### PM2 Commands
```bash
pm2 status              # View all processes
pm2 logs rihla-global   # View application logs
pm2 restart rihla-global # Restart application
pm2 stop rihla-global   # Stop application
pm2 delete rihla-global # Remove from PM2
pm2 monit               # Real-time monitoring
```

### Nginx Commands
```bash
sudo nginx -t                    # Test configuration
sudo systemctl restart nginx     # Restart Nginx
sudo systemctl status nginx      # Check status
sudo tail -f /var/log/nginx/error.log  # View error logs
```

### Update Deployment
```bash
cd ~/rihla-global
git pull origin main
npm install
npm run build
pm2 restart rihla-global
```

---

## Troubleshooting

### Application not loading
1. Check if PM2 is running: `pm2 status`
2. Check application logs: `pm2 logs rihla-global`
3. Verify port 5000 is listening: `sudo lsof -i :5000`

### 502 Bad Gateway
- Check if the application is running: `pm2 status`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### SSL Certificate Issues
- Renew certificate: `sudo certbot renew`
- Check certificate status: `sudo certbot certificates`

### Memory Issues
- Check memory usage: `free -m`
- PM2 will auto-restart if memory exceeds 500MB (configured in ecosystem.config.js)

---

## Security Checklist

- [ ] Remove port 3000/5000 from EC2 security group inbound rules (only allow 80/443)
- [ ] Keep SSH (port 22) restricted to your IP only
- [ ] Regularly update system packages: `sudo apt update && sudo apt upgrade`
- [ ] Monitor logs for suspicious activity
- [ ] Back up your .env file securely

---

## Estimated Monthly Costs

| Resource | Cost |
|----------|------|
| EC2 t2.micro (free tier) | $0/month first year, then ~$8-10/month |
| Elastic IP (attached) | Free |
| SSL Certificate | Free (Let's Encrypt) |
| Domain | $10-15/year |

---

## Support

For issues with this deployment, check:
1. Application logs: `pm2 logs rihla-global`
2. Nginx logs: `/var/log/nginx/error.log`
3. System logs: `sudo journalctl -u nginx`
