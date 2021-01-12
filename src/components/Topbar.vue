<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">MediumClone</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}" exact active-class="active">Home</router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'createArticle'}" active-class="active"><i class="ion-compose"></i> &nbsp; New article</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'setting'}" active-class="active"><i class="ion-gear-a"></i> &nbsp; Setting</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"
                         :to="{name: 'userProfile',
                         params: {slug: currentUser.username}}"><img class="user-pic" :src="currentUser.image"  alt="img"/> &nbsp; {{currentUser.username}}</router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}" active-class="active">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'register'}" active-class="active">Sign Up</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';
import {getterType} from '@/store/modules/auth';

export default {
  name: 'McvTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterType.currentUser,
      isLoggedIn: getterType.isLoggedIn,
      isAnonymous: getterType.isAnonymous
    })
  }
}
</script>