<?php
/**
 * Template Packager
 *
 * Copyright 2010 by Shaun McCormick <shaun@collabpad.com>
 *
 * This file is part of Template Packager.
 *
 * Template Packager is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or (at your option) any
 * later version.
 *
 * Template Packager is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Template Packager; if not, write to the Free Software Foundation, Inc., 59
 * Temple Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package templatepackager
 */
/**
 * Template Packager main class file.
 *
 * @package templatepackager
 */
class TemplatePackager {
    public $modx = null;
    public $config = array();

    /**
     * Default constructor for Template Packager
     *
     * @constructor
     * @param modX &$modx A reference to a modX instance.
     * @param array $config (optional) Configuration properties.
     * @return TemplatePackager
     */
    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;

        $corePath = $modx->getOption('temppack.core_path',null,$modx->getOption('core_path').'components/templatepackager/');
        $assetsUrl = $modx->getOption('temppack.assets_url',null,$modx->getOption('assets_url').'components/templatepackager/');

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
    }

    /**
     * Runs the Template Packager manager pages
     *
     * @access public
     * @return string The output HTML
     */
    public function initialize() {
        $modx =& $this->modx;
        $tp =& $this;
        $viewHeader = include $this->config['controllersPath'].'mgr/header.php';

        $f = $this->config['controllersPath'].'mgr/home.php';
        if (file_exists($f)) {
            $viewOutput = include $f;
        } else {
            $viewOutput = 'Action not found: '.$f;
        }

        return $viewHeader.$viewOutput;
    }
}