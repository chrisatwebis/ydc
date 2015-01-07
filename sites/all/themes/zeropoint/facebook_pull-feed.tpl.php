<ul class="facebook-feed">
<?php 
	$count = count($items);
	foreach ($items as $key => $item): 
	$classes = "";
	if($key === 0)
	{
		$classes .= " first";
	}
	if($key === $count - 1)
	{
		$classes .= " last";
	}
	$classes .= " item-".$key." ";
?>
  <li class="item <?php print $classes;?>">
    <span class="facebook-feed-picture"><img alt="<?php echo $item->from->name; ?>" src="http://graph.facebook.com/<?php echo $item->from->id; ?>/picture" /></span>
    <span class="facebook-feed-from"><a href="http://facebook.com/profile.php?id=<?php echo $item->from->id; ?>"><?php echo $item->from->name; ?></a></span>
    <span class="facebook-feed-time"><?php echo t('!time ago.', array('!time' => format_interval(time() - strtotime($item->created_time)))); ?></span>
	<span class="facebook-feed-message">
      <?php 
      
		if(!empty($item->message))
		{
			if(strlen($item->message) > 138)
			{
				echo truncate_utf8($item->message,138)."...";
			}else{
				echo $item->message;
			}
			
		}else{
			
			echo  "	<div class='photo_name'>
						<a href='".$item->link."' target='_blank'>".$item->name."</a><br/>
						<span class='caption'>".$item->caption."</span><br/><img src='".$item->picture."' alt='".$item->caption."'/>
					</div>";
		}
		 
		
		if ($item->type === 'link'){
     // echo $item->description; 
			echo l($item->name, $item->link);
		} 
		?>
	  <a href="<?php print $item->link;?>" target="_blank" class="fb-readmore">Read More</a>
  </span>
    
  </li>
<?php endforeach; ?>
</ul>
