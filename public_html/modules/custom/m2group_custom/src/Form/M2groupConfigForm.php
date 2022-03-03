<?php

namespace Drupal\m2group_custom\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Site\Settings;
use Drupal\Core\StreamWrapper\PublicStream;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\Request;

/**
 * Defines a form that configures docusign api settings.
 */
class M2groupConfigForm extends ConfigFormBase {
  /**
    * Config settings.
    *
    * @var string
    */
  const SETTINGS = 'm2group_custom.settings';

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'm2group_custom_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      static::SETTINGS,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, Request $request = NULL) {
    $config = $this->config(static::SETTINGS);

    $form['product_page_url'] = array(
      '#type' => 'textfield',
      '#title' => t('Đường dẫn trang sản phẩm'),
      '#default_value' => $config->get('product_page_url'),
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('m2group_custom.settings')
      ->set('product_page_url', trim($values['product_page_url']))
      ->save();

    parent::submitForm($form, $form_state);
  }
}
