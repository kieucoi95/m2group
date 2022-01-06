<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/gin/templates/node/node-edit-form.html.twig */
class __TwigTemplate_1437ffd92325072ab1d69d1f256dbbcb914acefba15b9ba1b523d35886d9cb53 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 32];
        $filters = ["escape" => 20, "without" => 20, "t" => 35];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['escape', 'without', 't'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 18
        echo "<div class=\"layout-node-form clearfix\">
  <div class=\"layout-region layout-region-node-main\">
    ";
        // line 20
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["form"] ?? null)), "advanced", "footer", "actions", "gin_actions", "gin_sidebar"), "html", null, true);
        echo "
  </div>
  <div class=\"layout-region layout-region-node-secondary\">
    <div class=\"layout-region__content\">
      ";
        // line 24
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["form"] ?? null), "advanced", [])), "html", null, true);
        echo "
    </div>
  </div>
  <div class=\"layout-node-form__actions\">
    ";
        // line 28
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["form"] ?? null), "gin_actions", [])), "html", null, true);
        echo "
  </div>
</div>

";
        // line 32
        if ((($context["gin_layout_paragraphs"] ?? null) == 1)) {
            // line 33
            echo "<style>
  .layout-node-form {
    --ginLPLayoutLabel: \"";
            // line 35
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Layout"));
            echo "\";
    --ginLPContentLabel: \"";
            // line 36
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Content"));
            echo "\";
  }
</style>
";
        }
    }

    public function getTemplateName()
    {
        return "themes/contrib/gin/templates/node/node-edit-form.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  90 => 36,  86 => 35,  82 => 33,  80 => 32,  73 => 28,  66 => 24,  59 => 20,  55 => 18,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/gin/templates/node/node-edit-form.html.twig", "C:\\xampp\\htdocs\\jobs\\1_m2group\\m2group\\web\\themes\\contrib\\gin\\templates\\node\\node-edit-form.html.twig");
    }
}
