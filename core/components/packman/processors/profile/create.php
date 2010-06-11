<?php
/**
 * Create a profile
 *
 * @package packman
 * @subpackage processors
 */
if (empty($scriptProperties['name'])) {
    return $modx->error->failure($modx->lexicon('packman.profile_err_ns_name'));
}
$profile = $modx->getObject('pacProfile',array('name' => $scriptProperties['name']));
if ($profile) return $modx->error->failure($modx->lexicon('packman.profile_err_ae'));

$profile = $modx->newObject('pacProfile');
$profile->fromArray($scriptProperties);

$data = $modx->fromJSON($_POST['data']);
$profile->set('data',$data);

if ($profile->save() === false) {
    return $modx->error->failure($modx->lexicon('packman.profile_err_save'));
}

return $modx->error->success('',$profile);
