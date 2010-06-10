<?php
/**
 * PackMan
 *
 * Copyright 2010 by Shaun McCormick <shaun@modxcms.com>
 *
 * This file is part of PackMan.
 *
 * PackMan is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option) any
 * later version.
 *
 * PackMan is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * PackMan; if not, write to the Free Software Foundation, Inc., 59
 * Temple Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package packman
 */
/**
 * PackMan main class file.
 *
 * @package packman
 */
class PackMan {
    public $modx = null;
    public $config = array();

    /**
     * Default constructor for PackMan
     *
     * @constructor
     * @param modX &$modx A reference to a modX instance.
     * @param array $config (optional) Configuration properties.
     * @return packman
     */
    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;

        $corePath = $modx->getOption('packman.core_path',null,$modx->getOption('core_path').'components/packman/');
        $assetsUrl = $modx->getOption('packman.assets_url',null,$modx->getOption('assets_url').'components/packman/');

        $this->config = array_merge(array(
            'corePath' => $corePath,
            'modelPath' => $corePath.'model/',
            'processorsPath' => $corePath.'processors/',
            'controllersPath' => $corePath.'controllers/',
            'includesPath' => $corePath.'includes/',

            'baseUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl.'css/',
            'jsUrl' => $assetsUrl.'js/',
            'connectorUrl' => $assetsUrl.'connector.php',
        ),$config);

        $this->modx->addPackage('packman',$this->config['modelPath']);
        $this->modx->lexicon->load('packman:default');
    }

    /**
     * Runs the PackMan manager pages
     *
     * @access public
     * @return string The output HTML
     */
    public function initialize() {
        $modx =& $this->modx;
        $tp =& $this;
        $viewHeader = include $this->config['controllersPath'].'mgr/header.php';

        $this->modx->regClientCSS($this->config['cssUrl'].'mgr.css');

        $f = $this->config['controllersPath'].'mgr/home.php';
        if (file_exists($f)) {
            $viewOutput = include $f;
        } else {
            $viewOutput = 'Action not found: '.$f;
        }

        return $viewHeader.$viewOutput;
    }
}