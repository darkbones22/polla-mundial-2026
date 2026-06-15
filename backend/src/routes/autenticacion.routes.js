import { Router } from 'express';

import { limiteLogin } from '../middleware/limitePeticiones.js';
import { validarCodigoParticipante } from '../services/autenticacion.service.js';

const router = Router();

router.post('/', limiteLogin, async (req, res, next) => {
  try {
    const resultado = await validarCodigoParticipante(req.body?.codigo);

    if (!resultado.ok) {
      req.limiteLogin?.registrarFallo?.();
      res.status(401).json(resultado);
      return;
    }

    req.limiteLogin?.resetear?.();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

export default router;
