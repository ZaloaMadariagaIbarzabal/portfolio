-- ───────────────────────────────────────────────────────────
--  Sukalde · base de datos de recetas (MySQL / MariaDB)
--  Importar desde phpMyAdmin: crea la BD y todas las tablas.
-- ───────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS sukalde
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sukalde;

CREATE TABLE IF NOT EXISTS recetas (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  titulo        VARCHAR(200) NOT NULL,
  descripcion   VARCHAR(400),
  tiempo        VARCHAR(40),
  tiempo_min    INT DEFAULT 30,
  dificultad    VARCHAR(40) DEFAULT 'Fácil',
  raciones_base INT DEFAULT 4,
  cocina        VARCHAR(60),
  plato         ENUM('entrante','principal','postre') DEFAULT 'principal',
  consejo       VARCHAR(400),
  photo_url     VARCHAR(500),
  origen        ENUM('base','usuario') DEFAULT 'base',
  creada_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS receta_ingredientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  receta_id INT NOT NULL,
  texto     TEXT NOT NULL,
  orden     INT DEFAULT 0,
  FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS receta_pasos (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  receta_id INT NOT NULL,
  texto     TEXT NOT NULL,
  orden     INT DEFAULT 0,
  FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS receta_etiquetas (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  receta_id INT NOT NULL,
  etiqueta  VARCHAR(60) NOT NULL,
  tipo      ENUM('dieta','objetivo','libre') DEFAULT 'libre',
  FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS favoritos (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  receta_id INT,
  titulo    VARCHAR(200) NOT NULL,
  datos     JSON,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lista_compra (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  texto     TEXT NOT NULL,
  hecho     TINYINT(1) NOT NULL DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_recetas_cocina ON recetas(cocina);
CREATE INDEX idx_recetas_plato  ON recetas(plato);
CREATE INDEX idx_ri_receta      ON receta_ingredientes(receta_id);
CREATE INDEX idx_re_receta      ON receta_etiquetas(receta_id);
