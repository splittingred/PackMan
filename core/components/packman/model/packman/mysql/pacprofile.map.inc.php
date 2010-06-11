<?php
/**
 * @package packman
 */
$xpdo_meta_map['pacProfile']= array (
  'package' => 'packman',
  'table' => 'packman_profile',
  'fields' => 
  array (
    'name' => '',
    'description' => '',
    'data' => '{}',
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
      'index' => 'index',
    ),
    'description' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'data' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'json',
      'null' => false,
      'default' => '{}',
    ),
  ),
);
