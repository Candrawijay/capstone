# Gunakan image Node.js sebagai base image
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /index

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam direktori kerja
COPY . .

# Expose port aplikasi
EXPOSE 8080

# Tentukan command untuk menjalankan aplikasi
CMD ["node", "index.js"]
