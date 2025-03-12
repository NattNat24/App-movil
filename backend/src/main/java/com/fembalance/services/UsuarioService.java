package com.fembalance.services;

import com.fembalance.models.Usuario; 
import com.fembalance.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener usuario por ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    //Guardar usuario con validación
    public Usuario guardarUsuario(Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("El correo ya está registrado.");
        }
        return usuarioRepository.save(usuario);
    }
    

    // Actualizar usuario existente
    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setCorreo(usuarioActualizado.getCorreo());
            usuario.setContraseña(usuarioActualizado.getContraseña());
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }

    // Eliminar usuario por ID
    public boolean eliminarUsuario(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
    //usuario por correo
    public Optional<Usuario> obtenerUsuarioPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public String obtenerDiario(Long id) {
        return usuarioRepository.findById(id).map(Usuario::getDiario).orElse(null);
    }
    
    public Usuario actualizarDiario(Long id, String nuevoDiario) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setDiario(nuevoDiario);
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }
    
    
}
