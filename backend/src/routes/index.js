import { Router } from 'express';

import healthRoutes from './health.routes.js';
import autenticacionRoutes from './autenticacion.routes.js';
import partidosRoutes from './partidos.routes.js';
import pollasRoutes from './pollas.routes.js';
import pronosticosRoutes from './pronosticos.routes.js';
import rankingRoutes from './ranking.routes.js';
import resultadosRoutes from './resultados.routes.js';
import detallePartidoRoutes from './detallePartido.routes.js';
import adminRoutes from './admin.routes.js';
import cronRoutes from './cron.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/login', autenticacionRoutes);
router.use('/pollas', pollasRoutes);
router.use('/partidos', partidosRoutes);
router.use('/pronosticos', pronosticosRoutes);
router.use('/ranking', rankingRoutes);
router.use('/resultados', resultadosRoutes);
router.use('/detalle-partido', detallePartidoRoutes);
router.use('/admin', adminRoutes);
router.use('/cron', cronRoutes);

export default router;
