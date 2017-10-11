<template>
  <div class="VolunteerPosition">
    <h2 class="VolunteerPosition-title">{{ position.area.title }} // {{ position.title }}</h2>
    <p class="VolunteerPosition-description">{{ position.html }}</p>
    <ul class="VolunteerPosition-meta">

      <li class="VolunteerPosition-metaItem" v-if="position.commitment">
        <span class="VolunteerPosition-metaLabel">Ministry Area</span>
        {{ position.area.title }}
      </li>

      <li class="VolunteerPosition-metaItem" v-if="position.availability">
        <span class="VolunteerPosition-metaLabel">Availability</span>
        {{ position.availability }}
      </li>

      <li class="VolunteerPosition-metaItem" v-if="position.commitment">
        <span class="VolunteerPosition-metaLabel">Commitment</span>
        {{ position.commitment }}
      </li>

      <li class="VolunteerPosition-metaItem" v-if="position.skills.length">
        <span class="VolunteerPosition-metaLabel">Skills</span>
        <span v-for="(skill, index) in position.skills" :key="skill.slug">{{ index > 0 ? ', ' : '' }}{{ skill.title }}</span>
      </li>

    </ul>
  </div>
</template>
<script>

    export default {

        props: {
            position: { required: true },
        },

    }
</script>