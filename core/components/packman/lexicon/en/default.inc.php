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
 * English default lexicon topic for PackMan
 *
 * @package packman
 * @subpackage lexicon
 */
$_lang['packman'] = 'PackMan';
$_lang['packman.assets_path'] = 'Assets Path';
$_lang['packman.assets_path_desc'] = 'The directory that this Snippet hosts its assets files in. If it is not found, it will be ignored.';
$_lang['packman.changelog'] = 'Changelog';
$_lang['packman.chunk'] = 'Chunk';
$_lang['packman.chunk_add'] = 'Add Chunk';
$_lang['packman.chunk_desc'] = 'The Chunk to package in.';
$_lang['packman.chunk_err_ns'] = 'Please select a Chunk.';
$_lang['packman.chunk_remove'] = 'Remove Chunk';
$_lang['packman.chunk_remove_confirm'] = 'Are you sure you want to remove this Chunk?';
$_lang['packman.chunks'] = 'Chunks';
$_lang['packman.chunks.intro_msg'] = '<p>Please select any Chunks you would like to add to the package.</p>';
$_lang['packman.core_path'] = 'Core Path';
$_lang['packman.core_path_desc'] = 'The directory that this Snippet hosts its core files in. If it is not found, it will be ignored.';
$_lang['packman.create_new...'] = 'Create New Profile from this...';
$_lang['packman.description'] = 'Description';
$_lang['packman.directories'] = 'Directories';
$_lang['packman.directories.intro_msg'] = '<p>Please select any directories you want added to the main Package. They will be transported and installed to the "target" path for each directory you specify.</p><p>It is important to note that your users will have to ensure that all the "target" directories are writable before Package Management can install the directories to them.</p>';
$_lang['packman.directory'] = 'Directory';
$_lang['packman.directory_add'] = 'Add Directory';
$_lang['packman.directory_add_desc'] = '<p>Please select a source directory and a target directory. The source directory is the directory on your filesystem; the target is the location in which you want to install the directory on the user\'s system.</p><p>You can use the following placeholders in either field: {base_path}, {core_path}, {assets_path}.</p><p>Make sure the target does not include the name of the source directory; ie, if you want the folder "assets/test/" to end up as the user\'s "assets/test/" directory, make the target be "assets/", <b>not</b> "assets/test/".</p>';
$_lang['packman.directory_err_ns'] = 'Please specify a source and target for the directory.';
$_lang['packman.directory_remove'] = 'Remove Directory';
$_lang['packman.directory_remove_confirm'] = 'Are you sure you want to remove this Directory?';
$_lang['packman.directory_source'] = 'Source';
$_lang['packman.directory_source_desc'] = 'The target directory to install from on your system.';
$_lang['packman.directory_target'] = 'Target';
$_lang['packman.directory_target_desc'] = 'The target directory to install into on the user\'s system.';
$_lang['packman.export'] = 'Export Transport Package';
$_lang['packman.intro_msg'] = '<p>To create a Transport Package, simply choose a Category name for your package. Then specify any Templates, Snippets, Chunks and/or Subpackages you want in the Package. You can then optionally specify a readme and/or license file to include with the Package. Finally, specify the version number and release of this Transport Package.</p>';
$_lang['packman.license'] = 'License';
$_lang['packman.license_desc'] = 'A license to require users to agree to on install. Optional.';
$_lang['packman.menu_desc'] = 'A tool for creating simple Transport Packages.';
$_lang['packman.name'] = 'Name';
$_lang['packman.mypackage'] = 'MyPackage';
$_lang['packman.package'] = 'Package';
$_lang['packman.package_name'] = 'Package Name';
$_lang['packman.package_name_desc'] = 'The name of the Package that will be created. A Category will be created with this name, and all packaged Elements will be assigned to it.';
$_lang['packman.plugin_add'] = 'Add Plugin';
$_lang['packman.plugin_desc'] = 'The Pluginto package in.';
$_lang['packman.plugin_err_ns'] = 'Please select a Plugin.';
$_lang['packman.plugin_remove'] = 'Remove Plugin';
$_lang['packman.plugin_remove_confirm'] = 'Are you sure you want to remove this Plugin?';
$_lang['packman.plugins'] = 'Plugins';
$_lang['packman.plugins.intro_msg'] = '<p>Please select any Plugins you would like to add to the package. Any core System Events that are associated to the Plugin will be automatically included.</p>';
$_lang['packman.profile_create'] = 'Create Profile';
$_lang['packman.profile_description_desc'] = 'A short description of the Profile.';
$_lang['packman.profile_name_desc'] = 'The name of the Profile.';
$_lang['packman.profile_remove'] = 'Remove Profile';
$_lang['packman.profile_remove_confirm'] = 'Are you sure you want to permanently remove this Profile?';
$_lang['packman.profile_save'] = 'Save Profile';
$_lang['packman.profile_saved'] = 'Profile successfully saved.';
$_lang['packman.profile_select'] = 'Select a Profile...';
$_lang['packman.readme'] = 'Readme';
$_lang['packman.readme_desc'] = 'A readme file to show on install. Optional.';
$_lang['packman.release'] = 'Release';
$_lang['packman.release_desc'] = 'The release of the Transport Package that will be created. Examples: beta1, rc2, pl';
$_lang['packman.release_err_nf'] = 'Please specify a release.';
$_lang['packman.signature'] = 'Signature';
$_lang['packman.subpackage'] = 'Subpackage';
$_lang['packman.subpackage_add'] = 'Add Subpackage';
$_lang['packman.subpackage_desc'] = 'The signature of the Subpackage to add in. You must have installed the Transport Package on this system to see it in this list.';
$_lang['packman.subpackage_err_ns'] = 'Please select a Subpackage.';
$_lang['packman.subpackage_remove'] = 'Remove Subpackage';
$_lang['packman.subpackage_remove_confirm'] = 'Are you sure you want to remove this Subpackage?';
$_lang['packman.subpackages'] = 'Subpackages';
$_lang['packman.subpackages.intro_msg'] = '<p>Please select any Transport Packages you want added to the main Package. They will be transported with the main Package.</p><p>If a newer version of the subpackage is found on the server, then it will be skipped; otherwise, it will be automatically installed. For example, if you package in FormIt 1.0.0-rc1, and FormIt 2.0.0-beta1 is on the server, the subpackage will be skipped.</p>';
$_lang['packman.snippet'] = 'Snippet';
$_lang['packman.snippet_add'] = 'Add Snippet';
$_lang['packman.snippet_desc'] = 'The Snippet to package in.';
$_lang['packman.snippet_err_ns'] = 'Please select a Snippet.';
$_lang['packman.snippet_remove'] = 'Remove Snippet';
$_lang['packman.snippet_remove_confirm'] = 'Are you sure you want to remove this Snippet?';
$_lang['packman.snippets'] = 'Snippets';
$_lang['packman.snippets_custom'] = 'Custom Snippets';
$_lang['packman.snippets.intro_msg'] = '<p>Please select Snippets and any files associated with them. <b>Note, you should not use this for Packages downloaded via Package Management.</b> You should use the Packages tab for those.</p>';
$_lang['packman.template'] = 'Template';
$_lang['packman.template_add'] = 'Add Template';
$_lang['packman.template_desc'] = 'The Template to package in.';
$_lang['packman.template_err_ns'] = 'Please select a Template.';
$_lang['packman.template_err_nf'] = 'Template not found!';
$_lang['packman.template_directory_desc'] = 'The directory name your Template files are located in. This must be one directory only. It will be installed into the assets/templates/ directory.';
$_lang['packman.template_remove'] = 'Remove Template';
$_lang['packman.template_remove_confirm'] = 'Are you sure you want to remove this Template?';
$_lang['packman.templates'] = 'Templates';
$_lang['packman.templates.intro_msg'] = '<p>Please select the Templates you want to package. The script will automatically package in any assigned Template Variables as well.</p><p>You may also specify a directory to package in with each Template. The script will automatically copy this directory to the assets/templates/ directory during the Package install. If the directory is not found on your system, it will be skipped.</p>';
$_lang['packman.version'] = 'Version';
$_lang['packman.version_desc'] = 'The version of the Transport Package that will be created. Examples: 1.0.0, 2.1, 3.2.5';
$_lang['packman.version_err_nf'] = 'Please specify a version.';
$_lang['packman.version_files_err_nf'] = 'The template files directory specified does not exist.';

