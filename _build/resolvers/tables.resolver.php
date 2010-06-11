<?php
/**
 * Creates the tables on install
 *
 * @package packman
 * @subpackage build
 */
if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $modx =& $object->xpdo;
            $modelPath = $modx->getOption('packman.core_path',null,$modx->getOption('core_path').'components/packman/').'model/';
            $modx->addPackage('packman',$modelPath);

            $manager = $modx->getManager();
            $modx->setLogLevel(modX::LOG_LEVEL_ERROR);
            $manager->createObjectContainer('pacProfile');
            $modx->setLogLevel(modX::LOG_LEVEL_INFO);
            break;
    }
}
return true;