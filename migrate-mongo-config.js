// migrate-mongo-config.js

const config = {
  mongodb: {
    // 1. Dùng biến môi trường (Environment Variable) để bảo mật
    // Nếu không có, nó sẽ mặc định kết nối local để dev, an toàn cho máy bạn
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017',

    // 2. Tách riêng databaseName, giúp bạn dễ đổi môi trường (dev/prod)
    databaseName: process.env.DB_NAME || 'nexus_core_dev',

    options: {
      // Các tùy chọn này là chuẩn mực cho driver MongoDB hiện đại (v6.x trở lên)
      connectTimeoutMS: 10000, // Timeout 10s là đủ, không cần 1 giờ
      socketTimeoutMS: 30000,
    },
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  lockCollectionName: 'changelog_lock',

  // lockTtl = 0 là hợp lý cho dự án đơn lẻ,
  // nếu sau này chạy server dạng cluster, hãy set lên 60-300s
  lockTtl: 0,

  migrationFileExtension: '.js',
  useFileHash: true, // NÂNG CẤP: Để true giúp tránh chạy lại các migration đã cũ
  moduleSystem: 'commonjs',
};

module.exports = config;
