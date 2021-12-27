const boardStore = {
    namespaced: true,
    state: {
      viewModal: false,
      writeModal: false,
      updateModal: false,
      boardId: 0,
    },
    getters: {},
    mutations: {
      VIEW_MODALHIDE: (state) => {
        state.viewModal = false;
      },
      WRITE_MODALHIDE: (state) => {
        state.writeModal = false;
      },
      UPDATE_MODALHIDE: (state) => {
        state.updateModal = false;
      },
      VIEW_MODALOPEN: (state, boardId) => {
        state.boardId = boardId;
        state.viewModal = true;
      },
      WRITE_MODALOPEN: (state) => {
        state.writeModal = true;
      },
      UPDATE_MODALOPEN: (state, boardId) => {
        state.boardId = boardId;
        state.updateModal = true;
      },
    },
    actions: {},
  };
  
  export default boardStore;
  