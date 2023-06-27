module.exports = {
  apps: [
    {
      name: 'todo-app', // Nombre de tu aplicación
      script: 'ng', // Comando para ejecutar Angular CLI
      args: 'serve --port 8001', // Argumentos adicionales para el comando
      instances: 1, // Número de instancias que deseas ejecutar
      autorestart: true, // Reiniciar automáticamente la aplicación en caso de error
      watch: false, // No observar cambios en los archivos
      max_memory_restart: '1G', // Reiniciar la aplicación si supera este límite de memoria
      env: {
        NODE_ENV: 'production' // Variable de entorno (puedes personalizarla según tus necesidades)
      }
    }
  ]
};
