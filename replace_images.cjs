const fs = require('fs');
const path = require('path');

const replacements = {
  'mock_hero_img_3x.webp': 'mock_hero_img_2x.webp',
  'my_hero_img_3x.webp': 'my_hero_img_2x.webp',
  'my_main_img_3x.webp': 'my_main_img_2x.webp',
  'my_bottom_img_3x.webp': 'my_bottom_img_2x.webp',
  'tbl_top_mockup_3x.webp': 'top_mockup_2x.webp',
  'common_user_flow_3x.webp': 'common_user_flow_2x.webp',
  'information_architecture_3x.webp': 'information_architecture_2x.webp',
  'wireframe_3x.webp': 'wireframe_2x.webp',
  'tbl_final_ui_mock_3x.webp': 'final_ui_mock_2x.webp',
  'tbl_ui_design_one_3x.webp': 'ui_design_one_2x.webp',
  'tbl_ui_design_two_3x.webp': 'ui_design_two_2x.webp',
  'tbl_all_ui_design_3x.webp': 'all_ui_design_2x.webp',
  'old_file_img_3x.webp': 'old_file_2x.webp',
  'new_file_img_3x.webp': 'new_file_2x.webp',
  'file_index_img_3x.webp': 'file_index_2x.webp',
  'desigb_checklist_img_3x.webp': 'design_checklist_image_2x.webp',
  'old_navbar_img_3x.webp': 'old_navigation_bar_2x.webp',
  'navigation_application_img_3x.webp': 'navigation_application_anatomy_2x.webp',
  'ia_mindmap_img_3x.webp': 'ia_mindmap_img_2x.webp',
  'collapse_navbar_img_3x.webp': 'collapse_new_navbar_2x.webp',
  'expanded_navbar_img_3x.webp': 'expanded_new_navbar_2x.webp',
  'navigation_system_img_3x.webp': 'navigation_system_2x.webp',
  'before_new_nav_img_3x.webp': 'before_new_navbar_2x.webp',
  'after_new_nav_img_3x.webp': 'after_new_navbar_2x.webp',
  'shibin_jhon_img_3x.webp': 'shibin_jhon_img_2x.webp',
  'lokesh_mali_3x.webp': 'lokesh_mali_2x.webp',
  'aditya_singh_3x.webp': 'aditya_singh_2x.webp',
  'sahiba_jain_img_3x.webp': 'sahiba_jain_img_2x.webp',
  'monika_nagwani_3x.webp': 'monika_nagwani_2x.webp',
  'story_one_img_3x.webp': 'story_one_img_2x.webp',
  'story_two_img_3x.webp': 'story_two_img_2x.webp',
  'story_three_img_3x.webp': 'story_three_img_2x.webp',
  'story_four_img_3x.webp': 'story_four_img_2x.webp',
  'story_five_img_3x.webp': 'story_five_img_2x.webp',
  'story_six_img_3x.webp': 'story_six_img_2x.webp',
  'story_seven_img_3x.webp': 'story_seven_img_2x.webp',
  'story_eight_img_3x.webp': 'story_eight_img_2x.webp'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldImg, newImg] of Object.entries(replacements)) {
        if (content.includes(oldImg)) {
          content = content.replaceAll(oldImg, newImg);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
