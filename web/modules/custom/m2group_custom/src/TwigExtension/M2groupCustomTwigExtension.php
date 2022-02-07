<?php

namespace Drupal\M2group_custom\TwigExtension;

use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Twig\TwigFunction;
use Drupal\node\Entity\Node;

/**
 * Twig extension with some useful functions and filters.
 *
 * Dependencies are not injected for performance reason.
 */
class M2groupCustomTwigExtension extends \Twig_Extension {
  /**
   * {@inheritdoc}
   */
  public function getTokenParsers() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getNodeVisitors() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getTests() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return [
      new TwigFunction('url_img', [$this, 'urlImg']),
      new TwigFunction('entity_trans', [$this, 'entityTrans']),
      new TwigFunction('term', [$this, 'term']),
      new TwigFunction('node', [$this, 'node']),
      new TwigFunction('p_load', [$this, 'pLoad']),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getOperators() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'm2group_custom.twig.extension';
  }

  public function urlImg ($targetId = null, $img_style = null) {
    if ($targetId != null) {
      $file = File::load($targetId);
      if ($img_style != null) {
        $uri = $file->getFileUri();
        $url = ImageStyle::load($img_style)->buildUrl($uri);
      } else {
        $url = $file->url();
      }
      return $url;
    } else {
      return 'empty target id';
    }
  }

  public function entityTrans ($e) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    if ($e->hasTranslation($language) == TRUE) {
      $e = $e->getTranslation($language);
    }
    return $e;
  }

  public function term ($tid) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $term = \Drupal\taxonomy\Entity\Term::load($tid);
    if ($term->hasTranslation($language) == TRUE) {
      $term = $term->getTranslation($language);
    }
    return $term;
  }

  public function node ($nid) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $node = Node::load($nid);
    return $node;
    if ($node->hasTranslation($language) == TRUE) {
      $node = $node->getTranslation($language);
    }
    return $node;
  }

  public function pLoad($pid) {
    $p = \Drupal\paragraphs\Entity\Paragraph::load($pid);
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    if ($p->hasTranslation($language) == TRUE) {
      $p = $p->getTranslation($language);
    }
    return $p;
  }
}
