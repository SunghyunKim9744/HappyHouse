<template>
  <md-list-item>
    <div class="md-list-item-text">
      <span> 일련번호 : {{ deal.일련번호 }}</span
      ><br />
      <span style="color:black"> 법정동 : {{ deal.법정동 }}</span
      ><br />
      <span> 층 : {{ deal.층 }}층</span><br />
      <span> 거래금액 : {{ (parseInt(deal.거래금액.replace(",", "")) * 10000) | price }}원</span
      ><br />
    </div>
  </md-list-item>
</template>

<script>
export default {
  name: "HouseListRowItem",
  props: {
    deal: Object,
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.md-list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
span {
  color: black;
}
</style>
