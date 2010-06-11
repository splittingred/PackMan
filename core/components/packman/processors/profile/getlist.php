<?php
/**
 * Grabs a list of profiles
 *
 * @package packman
 */
$modx->lexicon->load('chunk');

/* setup default properties */
$isLimit = !empty($scriptProperties['limit']);
$start = $modx->getOption('start',$scriptProperties,0);
$limit = $modx->getOption('limit',$scriptProperties,20);
$sort = $modx->getOption('sort',$scriptProperties,'name');
$dir = $modx->getOption('dir',$scriptProperties,'ASC');

/* query for chunks */
$c = $modx->newQuery('pacProfile');
$count = $modx->getCount('pacProfile');
$c->sortby($sort,$dir);
if ($isLimit) $c->limit($limit,$start);
$profiles = $modx->getCollection('pacProfile',$c);

/* iterate through profiles */
$list = array();
foreach ($profiles as $profile) {
    $list[] = $profile->toArray();
}

$list[] = array('id' => '-','name' => '<hr class="combo-hr" />');
$list[] = array('id' => 'CNEW','name' => $modx->lexicon('packman.create_new...'));

return $this->outputArray($list,$count);