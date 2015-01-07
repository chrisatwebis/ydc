<?php
/**
 * @file views-view-unformatted.tpl.php
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<style>
.view-id-taxonomy_term.view-display-id-about_us_term_view .views-field-field-images-fid .field-item-1,
.view-id-taxonomy_term.view-display-id-about_us_term_view .views-field-body
{
	display:none;
} 
.see-more, .see-less {
    margin-bottom: 10px;
    margin-left: 212px;
}
</style>
<script>
	$(document).ready(function(){
		
		$(".view-id-taxonomy_term.view-display-id-about_us_term_view .views-row .views-field-teaser").after("<div class='see-more '><a class='arrowdown' href='#'>see more</a></div>");
		$(".view-id-taxonomy_term.view-display-id-about_us_term_view .views-row .views-field-body").after("<div class='see-less '><a class='arrowup' href='#'>see less</a></div>");
		$(".view-id-taxonomy_term.view-display-id-about_us_term_view .views-row .views-field-body").hide();
		$(".view-id-taxonomy_term.view-display-id-about_us_term_view .see-less").hide();
		$(".views-field-field-images-fid .field-item-1").hide();
		$(".see-more").click(
			function(e){
				e.preventDefault();
				$(this).parents(".views-row").find(".views-field-teaser").hide();
				$(this).parents(".views-row").find(".views-field-body").slideDown();
				$(this).hide();
				$(this).parents(".views-row").find(".see-less").show();
				$(this).parents(".views-row").find(".views-field-field-images-fid .field-item-1").show();
			}
		);
		$(".see-less").click(
			function(e){
				e.preventDefault();
				$(this).parents(".views-row").find(".views-field-teaser").show();
				$(this).parents(".views-row").find(".views-field-body").slideUp();
				$(this).hide();
				$(this).parents(".views-row").find(".see-more").show();
				$(this).parents(".views-row").find(".views-field-field-images-fid .field-item-1").hide();
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