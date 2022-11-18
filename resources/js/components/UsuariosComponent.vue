<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">Usuarios</div>
                    <div class="card-body">
                        <div class="form-group">
                            <a class="btn btn-success" href="#" data-toggle="modal" data-target="#createModal"> Nuevo usuario</a>
                            <a href="reportes/reporte-usuarios" class="btn btn-success">Generar PDF</a>
                            <a href="excel/usuarios" class="btn btn-success">Exportar a Excel</a>
                        </div>
                        <table class="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th> Id </th>
                                <th> Nombre </th>
                                <th> Correo electronico </th>
                                <th> Acción </th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="usuario in usuarios">
                                    <td> {{ usuario._id }}</td>
                                    <td> {{ usuario.name }}</td>
                                    <td> {{ usuario.email }}</td>
                                    <td>
                                        <div class="btn-group-sm">
                                            <a href="#" v-on:click="editUsuario(usuario)" class="btn btn-primary btn-sm" title="Editar datos del usuario" data-target="#editModal"  data-toggle="modal" ><i class="fas fa-edit"></i></a>
                                            <a href="#" class="btn btn-danger btn-sm" data-toggle="tooltip" title="Eliminar datos del usuario" v-on:click.prevent="deleteUsuarios(usuario)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method = "post" name="editUser" id="editUser" action="#" @submit.prevent="updateUsuario">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" name="name" class="form-control" placeholder="Nombre" v-model="usuario.name" />
                            </div>
                            <div class="form-group">
                                <label for="email">Correo electronico</label>
                                <input type="text" name="email"  class="form-control" placeholder="Correo electronico" v-model="usuario.email" />
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" name="password" id="email" class="form-control" placeholder="contraseña" v-model="usuario.password"/>
                            </div>

                            <div class="form-group text-right">
                                <button class="btn btn-success">Guardar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">Crear Usuario</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method = "post" name="addUser" id="addUser" action="#" @submit.prevent="createUsuario">
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" name="name" class="form-control" placeholder="Nombre" v-model="usuario.name" />
                            </div>
                            <div class="form-group">
                                <label for="email">Correo electronico</label>
                                <input type="text" name="email"  class="form-control" placeholder="Correo electronico" v-model="usuario.email" />
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" name="password" class="form-control" placeholder="contraseña" v-model="usuario.password"/>
                            </div>

                            <div class="form-group text-right">
                                <button class="btn btn-success">Guardar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        created: function (){
            console.log('Creacion componente Modificado');
            this.getUsuarios();
        },
        mounted() {
            console.log('Component mounted. Modificado');
        },
        data(){
            return {
                usuarios: [],
                errors: [],
                usuario: {id:'', name:'', email:'', password:''}
            }
        },

        computed:{
            },
        methods:{
            getUsuarios: function(){
                var url ='api/usuarios';
                axios.get(url).then( response => {
                        this.usuarios = response.data
                    }
                );
            },
            deleteUsuarios: function(usuario){
                var url = 'api/usuarios/'+usuario._id;
                axios.delete(url).then( response => {
                    this.getUsuarios();
                });
            },
            createUsuario: function() {
                var url = 'api/usuarios';
                var data = {
                    name: this.usuario.name,
                    email: this.usuario.email,
                    password: this.usuario.password
                    };

                console.log('Guardar con fetch.');

                fetch(url, {
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json'
                            },
                    body: JSON.stringify( data )
                    })
                .then( res => res.json() )
                .then( res => console.log( 'componente vue', res ))
                .catch( err => console.log( 'componente vue', err ));

                /*axios.post(url, {
                    name : this.usuario.name,
                    email : this.usuario.email,
                    password: this.usuario.password
                }).then ( response => {
                    this.usuario.name = '';
                    this.usuario.email = '';
                    this.usuario.password = '';
                    this.errors = [];
                    this.getUsuarios();
                    $('#createModal').modal('hide');

                }).catch(error =>{
                    this.errors = error.response.data
                });*/
            },
            editUsuario: function(usuario) {
                this.usuario.id = usuario._id;
                this.usuario.name = usuario.name;
                this.usuario.email = usuario.email;
                this.usuario.password = '';
            },
            updateUsuario: function() {
                var url = 'api/usuarios/'+this.usuario.id;
                alert("Actualizar");
                axios.put(url, {
                    id: this.usuario.id,
                    name : this.usuario.name,
                    email : this.usuario.email,
                    password: this.usuario.password
                }).then ( response => {
                    this.usuario.name = '';
                    this.usuario.email = '';
                    this.usuario.password = '';
                    this.errors = [];
                    this.getUsuarios();
                    $('#editModal').modal('hide');

                }).catch(error =>{
                    this.errors = error.response.data
                });
            }
    }

    }
</script>
<style>
    .showmodal {
        display: none !important;
        opacity: 0;
    }
</style>