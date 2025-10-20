---
layout: page
title: Posts
permalink: /posts/
---

<div class="home">
  {%- if site.posts.size > 0 -%}
    <ul class="post-list">
      {%- for post in site.posts -%}
      {% if post.visible != false %}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="post-meta">{{ post.date | date: date_format }}</span>
        <h4>
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h4>
        {%- if site.show_excerpts -%}
          {{ post.excerpt }}
        {%- endif -%}
      </li>
      {% endif %}
      {%- endfor -%}
    </ul>

  {%- endif -%}

</div>
