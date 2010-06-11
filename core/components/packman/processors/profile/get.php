<?php
/**
 * Create a profile
 *
 * @package packman
 * @subpackage processors
 */
if (empty($scriptProperties['id'])) return $modx->error->failure($modx->lexicon('packman.profile_err_ns'));
$profile = $modx->getObject('pacProfile',$scriptProperties['id']);
if (empty($profile)) return $modx->error->failure($modx->lexicon('packman.profile_err_nf'));

$profileArray = $profile->toArray();

/* reformat data to work right */
$data = $profile->get('data');

/* templates */
if (!empty($data['templates'])) {
    $tpls = array();
    foreach ($data['templates'] as $tpl) {
        $tpls[] = array(
            $tpl['id'],
            $tpl['name'],
            $tpl['directory'],
        );
    }
    $profile->set('templates','(' . $modx->toJSON($tpls) . ')');
}

/* chunks */
if (!empty($data['chunks'])) {
    $tpls = array();
    foreach ($data['chunks'] as $tpl) {
        $tpls[] = array(
            $tpl['id'],
            $tpl['name'],
        );
    }
    $profile->set('chunks','(' . $modx->toJSON($tpls) . ')');
}

/* snippets */
if (!empty($data['snippets'])) {
    $tpls = array();
    foreach ($data['snippets'] as $tpl) {
        $tpls[] = array(
            $tpl['id'],
            $tpl['name'],
            $tpl['assets_path'],
            $tpl['core_path'],
        );
    }
    $profile->set('snippets','(' . $modx->toJSON($tpls) . ')');
}


/* packages */
if (!empty($data['packages'])) {
    $tpls = array();
    foreach ($data['packages'] as $tpl) {
        $tpls[] = array(
            $tpl['signature'],
        );
    }
    $profile->set('packages','(' . $modx->toJSON($tpls) . ')');
}


/* plugins */
if (!empty($data['plugins'])) {
    $tpls = array();
    foreach ($data['plugins'] as $tpl) {
        $tpls[] = array(
            $tpl['id'],
            $tpl['name'],
        );
    }
    $profile->set('plugins','(' . $modx->toJSON($tpls) . ')');
}

/* directories */
if (!empty($data['directories'])) {
    $tpls = array();
    foreach ($data['directories'] as $tpl) {
        $tpls[] = array(
            $tpl['source'],
            $tpl['target'],
        );
    }
    $profile->set('directories','(' . $modx->toJSON($tpls) . ')');
}


return $modx->error->success('',$profile);
