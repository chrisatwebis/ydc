<?php
/**
 * @file views-view-list.tpl.php
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates

 <?php print $wrapper_prefix; ?>
  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>
  <?php print $list_type_prefix; ?>
    <?php foreach ($rows as $id => $row): ?>
      <li class="<?php print $classes[$id]; ?>"><?php print $row; ?></li>
    <?php endforeach; ?>
  <?php print $list_type_suffix; ?>
<?php print $wrapper_suffix; ?>

 */
?>
<?php
	drupal_add_css(path_to_theme()."/css/wt-scroller.css");
	//drupal_add_js(path_to_theme()."/js/js/jquery-1.7.1.min.js");
	drupal_add_js(path_to_theme()."/js/js/jquery-ui-1.8.10.custom.min.js");
	drupal_add_js(path_to_theme()."/js/js/jquery.wt-scroller.min.js");
?>
<script type="text/javascript">
		$(document).ready(	
			function() {
				//initialize scroller
				$(".container").wtScroller({
					num_display:3,
					slide_width:310,
					slide_height:640,
					slide_margin:0,
					button_width:35,
					ctrl_height:25,
					margin:0,	
					auto_scroll:false,
					delay:4000,
					scroll_speed:1000,
					easing:"",
					auto_scale:true,
					move_one:false,
					ctrl_type:"scrollbar",
					display_buttons:true,
					mouseover_buttons:true,
					display_caption:true,
					mouseover_caption:true,
					caption_effect:"slide",
					caption_align:"bottom",
					caption_position:"outside",					
					cont_nav:true,
					shuffle:false,
					mousewheel_scroll:true
				});
				
				//initialize lightbox for scroller
/*				$("a[rel='scroller']").wtLightBox({
					rotate:true,
					delay:4000,
					duration:600,
					display_dbuttons:true,
					display_number:true,					
					display_timer:true,
					display_caption:true,
					caption_position:"outside",					
					cont_nav:true,
					auto_fit:true,
					easing:"",
					type:"GET"
				});
				
*/
			}
			
		);
	</script>
<?php print $wrapper_prefix; ?>
  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>


<div class="container">
	<div class="wt-scroller">
        <div class="prev-btn" title="click to scroll to previous"></div>          
  		<div class="slides">
            <ul>
                <?php foreach ($rows as $id => $row): ?>
				<li class="<?php print $classes[$id]; ?>"><?php print $row; ?></li>
				<?php endforeach; ?>
            </ul>
        </div>          	
     	<div class="next-btn" title="click to scroll to next"></div>
        <div class="lower-panel" title=""></div>
	</div>
</div>


<?php print $wrapper_suffix; ?>