<?php
/**
 * @file views-view-fields.tpl.php
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 
    [title] == Node: Title
    [field_images_fid] == Content: Images (field_images)
    [field_links_url] == Content: Links (field_links)
    [teaser] == truncated teaser
    [body] == Node: Body
    [type] == Node: Type
	[tid]
	
<?php foreach ($fields as $id => $field): ?>
  <?php if (!empty($field->separator)): ?>
    <?php print $field->separator; ?>
  <?php endif; ?>

  <?php print $field->wrapper_prefix; ?>
    <?php print $field->label_html; ?>
    <?php print $field->content; ?>
  <?php print $field->wrapper_suffix; ?>
<?php endforeach; ?>	
 */
?>

<?php
	//Filter out team member content type
	if($fields["type"]->raw == "team_member" || $fields["tid"]->raw == "31")
	{
		print $fields["field_images_fid"]->wrapper_prefix;
		print $fields["field_images_fid"]->content;
		print $fields["field_images_fid"]->wrapper_suffix;
		
		print "<div class='views-field views-field-body-visible'>";
		print '<div class="title-wrapper">'.$fields["title"]->content.'</div>';
		print '<div class="content-wrapper">'.$fields["body"]->content.'</div>';
		print "</div>";
	}else{
		print $fields["field_images_fid"]->wrapper_prefix;
		print $fields["field_images_fid"]->content;
		print $fields["field_images_fid"]->wrapper_suffix;
		
		print $fields["teaser"]->wrapper_prefix;
		print '<div class="title-wrapper">'.$fields["title"]->content.'</div>';
		print '<div class="content-wrapper">'.$fields["teaser"]->content.'</div>';
		print $fields["teaser"]->wrapper_suffix;
		
		print $fields["body"]->wrapper_prefix;
		print '<div class="title-wrapper">'.$fields["title"]->content.'</div>';
		print '<div class="content-wrapper">'.$fields["body"]->content.'</div>';
		print $fields["body"]->wrapper_suffix;
	}
	
?>