package com.fembalance.controllers;

import com.fembalance.models.Usuario;
import com.fembalance.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.obtenerPorId(id);
        return usuario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        // Validar si el correo ya está registrado
        Optional<Usuario> usuarioExistente = usuarioService.obtenerUsuarioPorCorreo(usuario.getCorreo());
        if (usuarioExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya está registrado");
        }
    
        // Validar la contraseña
        if (!validarContraseña(usuario.getContraseña())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.");
        }
    
        // Guardar el usuario si la validación es correcta
        Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }
    
    // Método para validar la contraseña
    private boolean validarContraseña(String contraseña) {
        String regex = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";
        return contraseña.matches(regex);
    }
    
    // Actualizar usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        Usuario usuario = usuarioService.actualizarUsuario(id, usuarioActualizado);
        return (usuario != null) ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    // Eliminar usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        return usuarioService.eliminarUsuario(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
    // Buscar el usuario por correo
    Optional<Usuario> usuarioExistente = usuarioService.obtenerUsuarioPorCorreo(usuario.getCorreo());

    // Validar si el usuario no existe
    if (!usuarioExistente.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no registrado");
    }

    // Validar si la contraseña es incorrecta
    if (!usuarioExistente.get().getContraseña().equals(usuario.getContraseña())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
    }

    return ResponseEntity.ok(usuarioExistente.get());
}
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
    @GetMapping("/{id}/diario")
    public ResponseEntity<String> obtenerDiario(@PathVariable Long id) {
        String diario = usuarioService.obtenerDiario(id);
        return diario != null ? ResponseEntity.ok(diario) : ResponseEntity.notFound().build();
}


    @PutMapping("/{id}/diario")
    public ResponseEntity<Usuario> actualizarDiario(@PathVariable Long id, @RequestBody String nuevoDiario) {
        Usuario usuarioActualizado = usuarioService.actualizarDiario(id, nuevoDiario);
        return usuarioActualizado != null ? ResponseEntity.ok(usuarioActualizado) : ResponseEntity.notFound().build();
}


}
