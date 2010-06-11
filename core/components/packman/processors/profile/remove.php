<?php
/**
 * Remove a profile
 *
 * @package packman
 * @subpackage processors
 */
if (empty($scriptProperties['id'])) return $modx->error->failure($modx->lexicon('packman.profile_err_ns'));
$profile = $modx->getObject('pacProfile',$scriptProperties['id']);
if (empty($profile)) return $modx->error->failure($modx->lexicon('packman.profile_err_nf'));

if ($profile->remove() === false) {
    return $modx->error->failure($modx->lexicon('packman.profile_err_remove'));
}


return $modx->error->success('',$profile);
