import express from 'express';
import {
  listPackages,
  getPackage,
  getCategory,
  searchHandler
} from '../controllers/packagesController.js';

const router = express.Router();

// Rotas
router.get('/', listPackages);                    // GET /api/packages
router.get('/search', searchHandler);              // GET /api/packages/search?q=termo
router.get('/category/:category', getCategory);   // GET /api/packages/category/:category
router.get('/:id', getPackage);                   // GET /api/packages/:id

export default router;
