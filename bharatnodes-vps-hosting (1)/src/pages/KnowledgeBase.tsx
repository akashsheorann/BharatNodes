import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Book, Server, Shield, Database, Globe, Cpu, Settings, HelpCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)

  const categories = [
    { id: 'all', name: 'All Articles', icon: Book, color: 'text-blue-400' },
    { id: 'getting-started', name: 'Getting Started', icon: Server, color: 'text-green-400' },
    { id: 'security', name: 'Security', icon: Shield, color: 'text-purple-400' },
    { id: 'database', name: 'Database', icon: Database, color: 'text-orange-400' },
    { id: 'networking', name: 'Networking', icon: Globe, color: 'text-cyan-400' },
    { id: 'performance', name: 'Performance', icon: Cpu, color: 'text-red-400' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: Settings, color: 'text-yellow-400' }
  ]

  const articles = [
    // Getting Started
    {
      id: 1,
      title: "Getting Started with Your VPS",
      category: "getting-started",
      excerpt: "Learn how to set up your first VPS, connect via SSH, and perform basic configuration.",
      content: `# Getting Started with Your VPS

Welcome to your new VPS! This comprehensive guide will walk you through the essential steps to get your server up and running.

## What You'll Need

Before we begin, make sure you have:
- Your VPS IP address and login credentials
- An SSH client (PuTTY for Windows, Terminal for macOS/Linux)
- Basic understanding of command line interface

## Step 1: Connect to Your VPS via SSH

### Using Terminal (macOS/Linux):
\`\`\`bash
ssh root@your_server_ip
\`\`\`

### Using PuTTY (Windows):
1. Download and install PuTTY
2. Enter your server IP in the Host Name field
3. Click "Open" and enter your credentials when prompted

## Step 2: Initial Server Setup

### Update Your System
Always start by updating your system packages:

\`\`\`bash
# For Ubuntu/Debian
apt update && apt upgrade -y

# For CentOS/RHEL
yum update -y
\`\`\`

### Create a Non-Root User
For security, create a new user:

\`\`\`bash
adduser username
usermod -aG sudo username
\`\`\`

### Configure SSH Key Authentication
Generate SSH keys on your local machine:

\`\`\`bash
ssh-keygen -t rsa -b 4096
\`\`\`

Copy the public key to your server:

\`\`\`bash
ssh-copy-id username@your_server_ip
\`\`\`

## Step 3: Basic Security Configuration

### Configure Firewall
Install and configure UFW:

\`\`\`bash
apt install ufw
ufw allow ssh
ufw enable
\`\`\`

### Disable Root Login
Edit SSH configuration:

\`\`\`bash
nano /etc/ssh/sshd_config
\`\`\`

Change these settings:
\`\`\`text
PermitRootLogin no
PasswordAuthentication no
\`\`\`

Restart SSH service:

\`\`\`bash
systemctl restart sshd
\`\`\`

## Next Steps

Congratulations! You now have a secure VPS setup. Consider:
- Installing a web server (Nginx/Apache)
- Setting up monitoring tools
- Configuring automated backups

## Troubleshooting

**Connection Refused**: Check if SSH is running and firewall settings
**Permission Denied**: Verify credentials and SSH key setup
**Timeout**: Check network connectivity and server status

Need help? Contact our support team anytime!`,
      readTime: "5 min read",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Installing and Configuring Nginx",
      category: "getting-started",
      excerpt: "Step-by-step guide to install and configure Nginx web server.",
      content: `# Installing and Configuring Nginx

Nginx is a high-performance web server perfect for VPS hosting. This guide covers installation and basic configuration.

## Installation

### Ubuntu/Debian:
\`\`\`bash
apt update
apt install nginx
\`\`\`

### CentOS/RHEL:
\`\`\`bash
yum install epel-release
yum install nginx
\`\`\`

## Basic Configuration

### Start and Enable Nginx
\`\`\`bash
systemctl start nginx
systemctl enable nginx
\`\`\`

### Configure Firewall
\`\`\`bash
ufw allow 'Nginx Full'
\`\`\`

## Virtual Host Configuration

### Create a New Site
\`\`\`bash
nano /etc/nginx/sites-available/yourdomain.com
\`\`\`

Add this configuration:

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/yourdomain.com;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
\`\`\`

### Enable the Site
\`\`\`bash
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
\`\`\`

## SSL Certificate Setup

### Install Certbot
\`\`\`bash
apt install certbot python3-certbot-nginx
\`\`\`

### Obtain SSL Certificate
\`\`\`bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
\`\`\`

### Auto-Renewal
\`\`\`bash
crontab -e
\`\`\`

Add this line:
\`\`\`text
0 12 * * * /usr/bin/certbot renew --quiet
\`\`\`

## Performance Optimization

### Enable Gzip Compression
Add to your server block:

\`\`\`nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
\`\`\`

### Configure Caching
\`\`\`nginx
location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
\`\`\`

## Testing Your Setup

1. Check Nginx status: \`systemctl status nginx\`
2. Test configuration: \`nginx -t\`
3. Visit your domain in a browser

## Common Issues

- **403 Forbidden**: Check file permissions
- **502 Bad Gateway**: Check if your application is running
- **SSL Errors**: Verify domain DNS and certificate validity

Need assistance? Our support team is here to help!`,
      readTime: "6 min read",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Apache Web Server Setup",
      category: "getting-started",
      excerpt: "Install and configure Apache web server with virtual hosts.",
      content: `# Apache Web Server Setup

Apache is one of the most popular web servers. This guide covers installation and configuration.

## Installation

### Ubuntu/Debian:
\`\`\`bash
apt update
apt install apache2
\`\`\`

### CentOS/RHEL:
\`\`\`bash
yum install httpd
\`\`\`

## Basic Configuration

### Start and Enable Apache
\`\`\`bash
# Ubuntu/Debian
systemctl start apache2
systemctl enable apache2

# CentOS/RHEL
systemctl start httpd
systemctl enable httpd
\`\`\`

## Virtual Host Configuration

### Create a New Site
\`\`\`bash
nano /etc/apache2/sites-available/yourdomain.com.conf
\`\`\`

Add this configuration:

\`\`\`apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/yourdomain.com
    
    <Directory /var/www/yourdomain.com>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>
\`\`\`

### Enable the Site
\`\`\`bash
a2ensite yourdomain.com.conf
systemctl reload apache2
\`\`\`

## SSL Certificate Setup

### Install Certbot
\`\`\`bash
apt install certbot python3-certbot-apache
\`\`\`

### Obtain SSL Certificate
\`\`\`bash
certbot --apache -d yourdomain.com -d www.yourdomain.com
\`\`\`

## Performance Optimization

### Enable .htaccess Override
\`\`\`bash
nano /etc/apache2/apache2.conf
\`\`\`

Change this line:
\`\`\`apache
<Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
\`\`\`

### Enable Compression
\`\`\`bash
a2enmod deflate
systemctl restart apache2
\`\`\`

## Testing Your Setup

1. Check Apache status: \`systemctl status apache2\`
2. Test configuration: \`apache2ctl configtest\`
3. Visit your domain in a browser

## Common Issues

- **403 Forbidden**: Check .htaccess and directory permissions
- **500 Internal Server**: Check error logs for syntax errors
- **SSL Problems**: Verify module installation and configuration

Need help? Contact our support team!`,
      readTime: "7 min read",
      difficulty: "Beginner"
    },
    {
      id: 4,
      title: "SSH Key Authentication",
      category: "getting-started",
      excerpt: "Set up secure SSH key authentication for passwordless login.",
      content: `# SSH Key Authentication

SSH key authentication provides better security than password-based login. This guide shows you how to set it up.

## Understanding SSH Keys

SSH keys use public-key cryptography:
- **Private Key**: Kept secret on your computer
- **Public Key**: Copied to the server
- **Authentication**: Server challenges you to prove you have the private key

## Generate SSH Keys

### On macOS/Linux:
\`\`\`bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
\`\`\`

### On Windows (using PuTTY):
1. Download PuTTYgen
2. Click "Generate" and move your mouse
3. Save both public and private keys

## Copy Public Key to Server

### Method 1: ssh-copy-id (Recommended)
\`\`\`bash
ssh-copy-id username@your_server_ip
\`\`\`

### Method 2: Manual Copy
\`\`\`bash
# Copy your public key
cat ~/.ssh/id_rsa.pub

# SSH to server and add it
ssh username@your_server_ip
mkdir -p ~/.ssh
echo "your_public_key" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
\`\`\`

## Configure SSH for Key Authentication

### Edit SSH Configuration
\`\`\`bash
sudo nano /etc/ssh/sshd_config
\`\`\`

Ensure these settings:
\`\`\`text
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
\`\`\`

### Restart SSH Service
\`\`\`bash
sudo systemctl restart sshd
\`\`\`

## Test Your Setup

### Test SSH Connection
\`\`\`bash
ssh -v username@your_server_ip
\`\`\`

Look for this line in the output:
\`\`\`text
Offering public key: /home/user/.ssh/id_rsa
\`\`\`

## Security Best Practices

### Protect Your Private Key
\`\`\`bash
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
\`\`\`

### Use SSH Agent
\`\`\`bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
\`\`\`

## Troubleshooting

**Permission Denied**: Check file permissions and authorized_keys format
**Key Not Working**: Verify SSH configuration and restart service
**Connection Refused**: Check if SSH is running and firewall settings

Need assistance? Our support team is available 24/7!`,
      readTime: "4 min read",
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Basic Linux Commands",
      category: "getting-started",
      excerpt: "Essential Linux commands every VPS user should know.",
      content: `# Basic Linux Commands

Master these essential Linux commands to effectively manage your VPS.

## File Management

### Navigation
\`\`\`bash
pwd          # Print working directory
ls           # List directory contents
cd /path     # Change directory
cd ..         # Go up one directory
cd ~          # Go to home directory
\`\`\`

### File Operations
\`\`\`bash
touch filename    # Create empty file
nano filename     # Edit file with nano
cp source dest    # Copy file
mv old new       # Move/rename file
rm filename       # Delete file
mkdir dirname     # Create directory
rmdir dirname     # Remove empty directory
rm -rf dirname   # Remove directory and contents
\`\`\`

### File Permissions
\`\`\`bash
chmod 755 file    # Set permissions
chown user:group file  # Change ownership
ls -la            # List with permissions
\`\`\`

## System Information

### System Status
\`\`\`bash
whoami          # Current user
uname -a         # System information
df -h            # Disk usage (human readable)
free -h          # Memory usage (human readable)
uptime            # System uptime
\`\`\`

### Process Management
\`\`\`bash
ps aux           # List all processes
top              # Interactive process viewer
kill PID          # Kill process by ID
killall name      # Kill process by name
\`\`\`

## Network Commands

### Network Status
\`\`\`bash
ip addr           # Show IP addresses
netstat -tlnp    # Show listening ports
ping hostname     # Test connectivity
curl url          # Download content from URL
\`\`\`

### File Transfer
\`\`\`bash
wget url         # Download file
scp file user@host:/path  # Secure copy
rsync -av src/ dest/  # Sync directories
\`\`\`

## Package Management

### Debian/Ubuntu (apt)
\`\`\`bash
apt update                    # Update package list
apt upgrade                   # Upgrade packages
apt install package_name        # Install package
apt remove package_name         # Remove package
apt search keyword            # Search packages
\`\`\`

### CentOS/RHEL (yum/dnf)
\`\`\`bash
yum update                    # Update packages
yum upgrade                   # Upgrade packages
yum install package_name        # Install package
yum remove package_name         # Remove package
yum search keyword            # Search packages
\`\`\`

## Text Manipulation

### Basic Text Operations
\`\`\`bash
cat file          # Display file content
less file         # View file page by page
head -n 10 file   # Show first 10 lines
tail -n 10 file   # Show last 10 lines
grep "pattern" file  # Search in file
\`\`\`

## Tips and Tricks

### Command History
\`\`\`bash
history           # Show command history
!number           # Execute command from history
ctrl + r          # Search command history
\`\`\`

### Useful Shortcuts
\`\`\`bash
ctrl + c          # Cancel current command
ctrl + d          # Exit current session
ctrl + z          # Suspend current process
tab               # Auto-complete
\`\`\`

## Practice Exercises

1. Navigate to /var/log and view system logs
2. Create a test directory and files
3. Check disk usage and memory
4. Practice file permissions

## Getting Help

### Built-in Help
\`\`\`bash
man command       # Manual pages
command --help     # Quick help
tldr command      # Simplified examples
\`\`\`

## Common Mistakes to Avoid

- Don't run \`rm -rf /\` (deletes everything!)
- Always check directory before deleting files
- Use tab completion to avoid typos
- Read command descriptions before using new commands

Master these commands and you'll be managing your VPS like a pro!`,
      readTime: "8 min read",
      difficulty: "Beginner"
    },
    
    // Security
    {
      id: 6,
      title: "Securing Your VPS: Best Practices",
      category: "security",
      excerpt: "Essential security measures to protect your server from common threats.",
      content: "Firewall configuration, SSH hardening, and security monitoring.",
      readTime: "8 min read",
      difficulty: "Intermediate"
    },
    {
      id: 7,
      title: "Setting Up Firewall with UFW",
      category: "security",
      excerpt: "Configure Uncomplicated Firewall to secure your VPS.",
      content: "Basic rules, port management, and advanced configurations.",
      readTime: "4 min read",
      difficulty: "Beginner"
    },
    {
      id: 8,
      title: "Fail2Ban Installation and Configuration",
      category: "security",
      excerpt: "Protect your server from brute force attacks with Fail2Ban.",
      content: "Install Fail2Ban, configure jails, and monitor banned IPs.",
      readTime: "6 min read",
      difficulty: "Intermediate"
    },
    {
      id: 9,
      title: "SSL Certificate Installation",
      category: "security",
      excerpt: "Install free SSL certificates using Let's Encrypt.",
      content: "Certbot installation, certificate renewal, and Nginx/Apache configuration.",
      readTime: "5 min read",
      difficulty: "Beginner"
    },
    {
      id: 10,
      title: "Security Audit and Hardening",
      category: "security",
      excerpt: "Comprehensive security audit and server hardening guide.",
      content: "System updates, service hardening, and security scanning tools.",
      readTime: "12 min read",
      difficulty: "Advanced"
    },
    
    // Database
    {
      id: 11,
      title: "MySQL Database Setup and Optimization",
      category: "database",
      excerpt: "Install MySQL, create databases, and optimize for performance.",
      content: "Database configuration, backup strategies, and performance tuning.",
      readTime: "10 min read",
      difficulty: "Intermediate"
    },
    {
      id: 12,
      title: "PostgreSQL Installation and Management",
      category: "database",
      excerpt: "Install and configure PostgreSQL database server.",
      content: "PostgreSQL setup, user management, and performance optimization.",
      readTime: "9 min read",
      difficulty: "Intermediate"
    },
    {
      id: 13,
      title: "MongoDB NoSQL Database Setup",
      category: "database",
      excerpt: "Install MongoDB and configure replica sets.",
      content: "MongoDB installation, replication, and backup strategies.",
      readTime: "8 min read",
      difficulty: "Intermediate"
    },
    {
      id: 14,
      title: "Redis Cache Server Configuration",
      category: "database",
      excerpt: "Set up Redis as a caching and session store.",
      content: "Redis installation, configuration, and optimization.",
      readTime: "5 min read",
      difficulty: "Beginner"
    },
    {
      id: 15,
      title: "Automated Backup Solutions",
      category: "database",
      excerpt: "Set up automated backups for your data and applications.",
      content: "Cron jobs, rsync, and cloud backup strategies.",
      readTime: "6 min read",
      difficulty: "Intermediate"
    },
    
    // Networking
    {
      id: 16,
      title: "Domain and DNS Configuration",
      category: "networking",
      excerpt: "Point your domain to your VPS and configure DNS records.",
      content: "A records, CNAME, MX records, and DNS propagation.",
      readTime: "7 min read",
      difficulty: "Beginner"
    },
    {
      id: 17,
      title: "Load Balancer Setup with Nginx",
      category: "networking",
      excerpt: "Configure Nginx as a load balancer for multiple servers.",
      content: "Upstream configuration, health checks, and failover setup.",
      readTime: "9 min read",
      difficulty: "Advanced"
    },
    {
      id: 18,
      title: "VPN Server Configuration",
      category: "networking",
      excerpt: "Set up your own VPN server using OpenVPN.",
      content: "OpenVPN installation, client configuration, and security.",
      readTime: "11 min read",
      difficulty: "Advanced"
    },
    {
      id: 19,
      title: "CDN Integration and Configuration",
      category: "networking",
      excerpt: "Integrate CDN services to improve website performance.",
      content: "Cloudflare setup, cache configuration, and optimization.",
      readTime: "6 min read",
      difficulty: "Intermediate"
    },
    {
      id: 20,
      title: "Network Monitoring with Netdata",
      category: "networking",
      excerpt: "Monitor network traffic and bandwidth usage.",
      content: "Netdata installation, dashboard configuration, and alerts.",
      readTime: "7 min read",
      difficulty: "Intermediate"
    },
    
    // Performance
    {
      id: 21,
      title: "Performance Monitoring and Optimization",
      category: "performance",
      excerpt: "Monitor server performance and optimize resource usage.",
      content: "CPU, memory, disk monitoring, and optimization techniques.",
      readTime: "9 min read",
      difficulty: "Advanced"
    },
    {
      id: 22,
      title: "PHP Performance Optimization",
      category: "performance",
      excerpt: "Optimize PHP for better performance and lower memory usage.",
      content: "OPcache configuration, PHP-FPM tuning, and profiling.",
      readTime: "8 min read",
      difficulty: "Intermediate"
    },
    {
      id: 23,
      title: "Database Query Optimization",
      category: "performance",
      excerpt: "Optimize database queries for faster response times.",
      content: "Index optimization, query analysis, and caching strategies.",
      readTime: "10 min read",
      difficulty: "Advanced"
    },
    {
      id: 24,
      title: "Caching Strategies with Varnish",
      category: "performance",
      excerpt: "Implement Varnish cache to accelerate web applications.",
      content: "Varnish installation, VCL configuration, and cache management.",
      readTime: "9 min read",
      difficulty: "Advanced"
    },
    {
      id: 25,
      title: "Server Resource Management",
      category: "performance",
      excerpt: "Manage and optimize server resources effectively.",
      content: "Process management, memory optimization, and disk cleanup.",
      readTime: "7 min read",
      difficulty: "Intermediate"
    },
    
    // Troubleshooting
    {
      id: 26,
      title: "Troubleshooting Common Issues",
      category: "troubleshooting",
      excerpt: "Diagnose and fix common VPS problems.",
      content: "Network issues, service failures, and performance problems.",
      readTime: "8 min read",
      difficulty: "Intermediate"
    },
    {
      id: 27,
      title: "Log Analysis and Debugging",
      category: "troubleshooting",
      excerpt: "Analyze system logs to identify and resolve issues.",
      content: "Log locations, analysis tools, and common error patterns.",
      readTime: "7 min read",
      difficulty: "Intermediate"
    },
    {
      id: 28,
      title: "Recovering from System Crashes",
      category: "troubleshooting",
      excerpt: "Steps to recover your VPS after system crashes.",
      content: "Boot recovery, data restoration, and prevention measures.",
      readTime: "10 min read",
      difficulty: "Advanced"
    },
    {
      id: 29,
      title: "Memory Leak Detection and Fixing",
      category: "troubleshooting",
      excerpt: "Identify and fix memory leaks in applications.",
      content: "Memory profiling, debugging tools, and optimization techniques.",
      readTime: "9 min read",
      difficulty: "Advanced"
    },
    {
      id: 30,
      title: "Disk Space Management",
      category: "troubleshooting",
      excerpt: "Manage disk space and resolve storage issues.",
      content: "Disk usage analysis, cleanup strategies, and monitoring.",
      readTime: "6 min read",
      difficulty: "Beginner"
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const selectedArticleData = articles.find(article => article.id === selectedArticle)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10'
      case 'Advanced': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        const lang = line.slice(3).replace('`', '')
        return (
          <div key={index} className="my-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{lang}</code>
            </pre>
          </div>
        )
      }
      
      // Handle inline code
      if (line.includes('`') && !line.startsWith('```')) {
        const parts = line.split('`')
        return (
          <p key={index} className="mb-4 text-zinc-300 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <code key={i} className="bg-gray-800 px-2 py-1 rounded text-green-400">{part}</code> : part
            )}
          </p>
        )
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        const level = line.match(/^#+/)?.[0].length || 1
        const HeaderTag = `h${Math.min(level + 1, 6)}`
        const text = line.replace(/^#+\s*/, '')
        return (
          <HeaderTag key={index} className={`mb-4 font-bold text-white ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : level === 3 ? 'text-xl' : 'text-lg'}`}>
            {text}
          </HeaderTag>
        )
      }
      
      // Handle lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="mb-2 text-zinc-300 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        )
      }
      
      // Handle bold text
      if (line.includes('**') && !line.startsWith('```')) {
        const parts = line.split('**')
        return (
          <p key={index} className="mb-4 text-zinc-300 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
            )}
          </p>
        )
      }
      
      // Regular paragraph
      if (line.trim()) {
        return (
          <p key={index} className="mb-4 text-zinc-300 leading-relaxed">
            {line}
          </p>
        )
      }
      
      return null
    }).filter(Boolean)
  }

  // If an article is selected, show the article detail view
  if (selectedArticleData) {
    React.useEffect(() => {
      window.scrollTo(0, 0)
    }, [selectedArticle])
    
    return (
      <div className="min-h-screen bg-black pt-20">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center gap-6 text-sm">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ← Back to Knowledge Base
              </button>
              <span className="text-zinc-600">/</span>
              <span className="text-white">{selectedArticleData.title}</span>
            </nav>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                  <span className={getDifficultyColor(selectedArticleData.difficulty)}>
                    {selectedArticleData.difficulty}
                  </span>
                  <span>•</span>
                  <span>{selectedArticleData.readTime}</span>
                </div>
                
                <div className="text-zinc-300 leading-relaxed">
                  {formatContent(selectedArticleData.content)}
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-zinc-500 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white">Knowledge Base</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <HelpCircle size={64} className="mx-auto mb-6 text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Knowledge <span className="italic font-serif">Base</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
              Comprehensive guides and tutorials to help you make the most of your VPS hosting
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-light mb-4">Browse by Category</h2>
            <p className="text-zinc-500">Find articles organized by topic</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 border rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'border-white bg-white/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <category.icon size={24} className={`mx-auto mb-2 ${category.color}`} />
                <div className="text-xs text-center">{category.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-light mb-4">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-zinc-500">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle size={48} className="mx-auto text-zinc-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-zinc-500">Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(article.id)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{article.readTime}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-light mb-4">Still Need Help?</h2>
            <p className="text-zinc-500 mb-8">
              Can't find what you're looking for? Our support team is here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-white text-black font-medium rounded-lg"
                >
                  Contact Support
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border border-white/20 text-white font-medium rounded-lg"
              >
                Start Live Chat
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
