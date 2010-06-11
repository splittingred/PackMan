<?php
/**
 * Update a profile
 *
 * @package packman
 * @subpackage processors
 */
if (empty($scriptProperties['id'])) return $modx->error->failure($modx->lexicon('packman.profile_err_ns'));
$profile = $modx->getObject('pacProfile',$scriptProperties['id']);
if (empty($profile)) return $modx->error->failure($modx->lexicon('packman.profile_err_nf'));

$data = $modx->fromJSON($_POST['data']);
$profile->set('data',$data);

if ($profile->save() === false) {
    return $modx->error->failure($modx->lexicon('packman.profile_err_save'));
}


return $modx->error->success('',$profile);
