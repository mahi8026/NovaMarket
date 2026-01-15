# MongoDB Atlas Setup Guide

Complete step-by-step guide to set up MongoDB Atlas for Nova Marketplace.

## Step 1: Create MongoDB Atlas Account

1. Visit [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with:
   - Email and password, OR
   - Google account, OR
   - GitHub account
3. Complete the registration form

## Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"** or **"Create"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider:
   - AWS (recommended)
   - Google Cloud
   - Azure
4. Choose a region closest to you
5. Name your cluster (e.g., "NovaMarketplace")
6. Click **"Create Cluster"**
7. Wait 3-5 minutes for cluster creation

## Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - Username: `novamarket` (or your choice)
   - Password: Click **"Autogenerate Secure Password"** or create your own
   - **IMPORTANT**: Copy and save the password!
5. Under **"Database User Privileges"**, select:
   - **"Read and write to any database"**
6. Click **"Add User"**

## Step 4: Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, choose one:
   - **Option A (Easy)**: Click **"Allow Access from Anywhere"**
     - Adds `0.0.0.0/0` (all IPs)
     - Good for development
   - **Option B (Secure)**: Click **"Add Current IP Address"**
     - Adds only your current IP
     - More secure but needs updating if IP changes
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **6.3 or later**
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://novamarket:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT**: Replace `<password>` with your actual password

## Step 6: Configure Your Application

1. Open `express-server/.env` file
2. Update the `MONGODB_URI` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://novamarket:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nova-marketplace?retryWrites=true&w=majority
   ```
3. Make sure to:
   - Replace `YOUR_PASSWORD` with your actual password
   - Add `/nova-marketplace` before the `?` to specify the database name
   - Keep `?retryWrites=true&w=majority` at the end

### Example

If your username is `novamarket` and password is `MySecurePass123`, your connection string should be:

```env
MONGODB_URI=mongodb+srv://novamarket:MySecurePass123@cluster0.abc123.mongodb.net/nova-marketplace?retryWrites=true&w=majority
```

## Step 7: Install Dependencies

```bash
cd express-server
npm install
```

## Step 8: Start the Server

```bash
npm start
```

You should see:

```
✅ Successfully connected to MongoDB Atlas!
✅ Database indexes created
📦 Initializing database with sample products...
✅ Inserted 6 sample products
🚀 Nova Marketplace API Server with MongoDB Atlas
✅ Server running on http://localhost:3001
```

## Step 9: Verify Connection

Open your browser or use curl:

```bash
curl http://localhost:3001/api/health
```

You should see:

```json
{
  "status": "ok",
  "message": "Nova Marketplace API is running",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "productsCount": 6
}
```

## Troubleshooting

### Error: "Authentication failed"

**Problem**: Wrong username or password

**Solution**:

1. Go to MongoDB Atlas → Database Access
2. Edit your user
3. Reset password
4. Update `.env` file with new password

### Error: "Network timeout" or "Connection refused"

**Problem**: IP address not whitelisted

**Solution**:

1. Go to MongoDB Atlas → Network Access
2. Check if your IP is listed
3. If not, add it or use "Allow Access from Anywhere"

### Error: "MONGODB_URI not configured"

**Problem**: `.env` file not set up correctly

**Solution**:

1. Make sure `.env` file exists in `express-server` folder
2. Check that `MONGODB_URI` is set
3. Ensure no spaces around the `=` sign

### Special Characters in Password

If your password contains special characters like `@`, `#`, `$`, etc., you need to URL-encode them:

| Character | Encoded |
| --------- | ------- |
| @         | %40     |
| #         | %23     |
| $         | %24     |
| %         | %25     |
| ^         | %5E     |
| &         | %26     |

Example: Password `Pass@123` becomes `Pass%40123`

## Viewing Your Data

1. Go to MongoDB Atlas → Database
2. Click **"Browse Collections"**
3. Select `nova-marketplace` database
4. Select `products` collection
5. View all your products!

## Next Steps

- ✅ Server is running with MongoDB Atlas
- ✅ Sample products are loaded
- ✅ Ready to connect your Next.js frontend
- 🚀 Start building!

## Free Tier Limits

MongoDB Atlas M0 (Free) tier includes:

- 512 MB storage
- Shared RAM
- Shared vCPU
- No backup
- Perfect for development and small projects

For production, consider upgrading to M2 or higher.

## Support

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)
