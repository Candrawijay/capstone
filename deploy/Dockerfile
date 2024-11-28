# Gunakan Node.js sebagai base image    
FROM node:18-slim

# Buat direktori kerja
WORKDIR /app

# Salin file package.json dan install dependensi
COPY package.json .
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Ekspos port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
