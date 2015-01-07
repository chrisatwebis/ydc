<!-- node --> 
<div id="node-<?php print $node->nid; ?>" class="node <?php print $node_classes; ?>">
  <?php if ($submitted): ?>
    <?php print $picture ?>
  <?php endif;?>

  <?php if ($page == 0): ?>
  <h2 class="title"><a href="<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h2>
  <?php endif; ?>





  <?php if ($node_middle && !$teaser): ?>
  <div id="node-middle">
    <?php print $node_middle; ?>
  </div>
  <?php endif; ?>

  <div class="content">
    <?php if ($page == 1): ?>
      <h2 class="title"><?php print $title ?></h2>
    <?php endif; ?>
    <div class="meta">
    <?php if ($submitted): ?>
      <div class="submitted"><?php print $submitted ?></div>
    <?php endif; ?>
    </div>
    <?php print $content ?>
		<?php if ($terms): ?>
		<div class="custom_terms">
			<?php
				$custom_terms = t("ARTICLE TOPICS: ");
				foreach($node->taxonomy as $tid => $t){
          if($t->vid == 10){
            continue;            
          }
					$custom_terms .= l($t->name,"taxonomy/term/".$tid).", ";
				}
				print substr($custom_terms,0,count($custom_terms)-3);
			?>
		</div>
		<?php endif;?>
  </div>

  <?php if ($links): ?>
  <div class="links">
    <?php print $links; ?>
  </div>
  <?php endif; ?>
	

	
  <?php if ($node_bottom && !$teaser): ?>
  <div id="node-bottom">
    <?php print $node_bottom; ?>
  </div>
  <?php endif; ?>
</div>
<!-- /node-<?php print $node->nid; ?> --> 