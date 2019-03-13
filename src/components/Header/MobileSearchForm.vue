<template>
	<div class="search-form-wrap">
		<v-btn fab dark small class="close-btn">
			<v-icon dark>close</v-icon>
		</v-btn>
		<div class="d-flex align-center justify-center centered">
			<v-form>
				<v-text-field 
					dark
					v-model="search"
					prepend-icon="search"
					placeholder="What are you looking for.."
					autocomplete="true"
					@click.stop="onClickSearch"
					color="white"
				>
				</v-text-field>
			</v-form>
		</div>
	</div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      search: ""
    };
  },
  mounted() {
    $(".mobile-search-btn").click(function(e) {
      e.stopPropagation();
      $(".search-form-wrap").addClass("search-slide");
    });
    $(".close-btn").click(function(e) {
      e.stopPropagation();
      $(".search-form-wrap").removeClass("search-slide");
    });
    $(".search-form-wrap").click(function(e) {
      e.stopPropagation();
      $(this).removeClass("search-slide");
    });
  },
  methods: {
    onClickSearch() {
      console.log("work");
    }
  }
};
</script>

