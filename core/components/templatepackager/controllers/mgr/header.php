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
 * ; if not, write to the Free Software Foundation, Inc., 59
 * Temple Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package templatepackager
 */
/**
 * @package templatepackager
 * @subpackage controllers
 */
$modx->regClientStartupScript($tp->config['jsUrl'].'tp.js');
$modx->regClientStartupHTMLBlock('<script type="text/javascript">
Ext.onReady(function() {
    TP.config = '.$modx->toJSON($tp->config).';
    TP.config.connector_url = "'.$tp->config['connectorUrl'].'";
    TP.request = '.$modx->toJSON($_GET).';
});
</script>');

return '';