<?php
/**
 * @file views-view-unformatted.tpl.php
 * Default simple view template to display a list of rows.
 *
    [field_avatar_fid] == Content: Avatar (field_avatar)
    [title] == Node: Title
    [body] == Node: Body

 
 * @ingroup views_templates
 */
?>
<style>
	.view-id-taxonomy_term.view-display-id-product_term_view  .views-field-field-images-fid .big_images_wrapper,
	.view-id-taxonomy_term.view-display-id-product_term_view .views-field-body
	{
		display:none;
	}
	
</style>
<script>
	$(document).ready(function(){
	
 		$(".view-taxonomy-term.view-id-taxonomy_term .views-row .views-field-teaser").after("<div class='see-more '><a class='arrowdown' href='#'>see more</a></div>");
		$(".view-taxonomy-term.view-id-taxonomy_term .views-row .views-field-body").after("<div class='see-less '><a class='arrowup' href='#'>see less</a></div>");
		$(".view-taxonomy-term.view-id-taxonomy_term .views-row .views-field-body").hide();
		$(".view-taxonomy-term.view-id-taxonomy_term .views-row .see-less").hide();
		
		/* $(this).parents(".views-row").find(".views-field-field-images-fid .big_images_wrapper").hide();
		$(this).parents(".views-row").find(".views-field-field-images-fid .small_images_wrapper").show(); */
		
		$(".see-more").click(
			function(e){
				e.preventDefault();
				$(this).parents(".views-row").find(".views-field-teaser").hide();
				$(this).parents(".views-row").find(".views-field-body").slideDown();
				$(this).hide();
				$(this).parents(".views-row").find(".see-less").show();
				$(this).parents(".views-row").find(".views-field-field-images-fid .big_images_wrapper").show();
				$(this).parents(".views-row").find(".views-field-field-images-fid .small_images_wrapper").hide();
			}
		);
		$(".see-less").click(
			function(e){
				e.preventDefault();
				$(this).parents(".views-row").find(".views-field-teaser").show();
				$(this).parents(".views-row").find(".views-field-body").slideUp();
				$(this).hide();
				$(this).parents(".views-row").find(".see-more").show();
				
				$(this).parents(".views-row").find(".views-field-field-images-fid .big_images_wrapper").hide();
				$(this).parents(".views-row").find(".views-field-field-images-fid .small_images_wrapper").show();
			}
		);
		
	});

</script>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
  <div class="<?php print $classes[$id]; ?>">
    <?php print $row; ?>
  </div>
<?php endforeach; ?>