<!--
 * @Author: DongZS
 * @Date: 2022-04-13 19:04:29
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\views\index.vue
-->
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        theme="dark"
        mode="inline"
      >
        <template v-for="(item, index) in sideMenus" :key="index">
          <a-menu-item
            :key="item.key"
            @click="goPage(item.path)"
            v-if="!item.children || item.children.length === 0"
          >
            <span>{{ item.name }}</span>
          </a-menu-item>
          <a-sub-menu :key="item.key" v-else>
            <template #title>
              <span>
                <span>{{ item.name }}</span>
              </span>
            </template>
            <a-menu-item
              v-for="childItem in item.children"
              @click="goPage(childItem.path)"
              :key="childItem.key"
              >{{ childItem.name }}</a-menu-item
            >
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button 
          type="primary" 
          @click="searchData"
          :disabled="btnDisable">
          <template #icon><SearchOutlined /></template>
          查询
        </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { SearchOutlined } from '@ant-design/icons-vue';
import { getSideList } from '@/api/index'
import bus from "@/assets/util/bus"
export default defineComponent({
  name: "indexCom",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined
  },
  setup() {
    const state = reactive({
      sideMenus: [],
      btnDisable: true
    });
    let currentName: string = ""
    onMounted(() => {
      initGetSideList()
    })
    const initGetSideList = () => {
      getSideList().then(res => {
        state.sideMenus = res.data
      })
    }
    watch(useRoute(), (val) => {
      currentName = val.path.replace("/", "")
      state.btnDisable = ["home", "china"].includes(currentName)
    }, {
      immediate: true
    })
    const router = useRouter();
    const goPage = (path: string): void => {
      router.push({ path });
    };
    const searchData = () => {
      bus.emit('searchData')
    }
    return {
      ...toRefs(state),
      selectedKeys: ref<string[]>([currentName]),
      openKeys: ref<string[]>(["sub1"]),
      collapsed: ref<boolean>(false),
      goPage,
      searchData
    };
  },
});
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>