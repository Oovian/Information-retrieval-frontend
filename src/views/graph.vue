<template>
  <div>
    <h3>the loading may take a few time, please wait...</h3>
    <div id="mynetwork"></div>
  </div>
</template>
<script>
const vis = require('vis-network/dist/vis-network.min.js')
require('vis-network/dist/dist/vis-network.min.css')
const axios = require('axios').default;
export default {
  data() {
    return {
      node_list: [],
      edge_list: [],
      nodes: new vis.DataSet([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ]),
      edges: new vis.DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 3 }
      ]),
    }
  },
  mounted() {
    var urlstr = '/author/'
    urlstr = urlstr.concat(this.$route.params.name).concat('/cooperation_graph/1');
    console.log(urlstr)
    const that= this
    axios({ method: 'GET', url: urlstr })
        .then(resp => {
                if (resp.data) {
                    that.edge_list = resp.data['content'].edge_list
                    that.node_list = resp.data['content'].node_list
                    if(that.node_list.length == 0){
                      that.node_list.push({id: 1, label: that.$route.params.name})
                    }
                    var container = document.getElementById('mynetwork');
                    var data = {
                      nodes: that.node_list,
                      edges: that.edge_list
                    };
                    var options = {
                      height:'100%',
                      width:'100%'
                    };
                    var network = new vis.Network(container, data, options);
                }
                else {
                    console.log('error:no resp data')
                }
        });    
  }
}
</script>
<style scoped>
#mynetwork {
  width: 48vw;
  height: 100vh;
  border: 1px solid lightgray;
}
</style>