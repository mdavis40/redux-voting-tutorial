import Server from 'socket.io'

export default function startServer(store) {
  const io = new Server().attach(8090)
  console.log('server listening...')

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )
  console.log('current state:\n')
  console.log(store.getState().toJS())

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS())
    socket.on('action', store.dispatch.bind(store))
  })
}
