# Flujo de trabajo con Git y GitHub

Cómo versionamos este proyecto. Guía práctica para mantener `main` estable y el historial limpio y legible.

## Ramas

- `main` — código estable y desplegable. Nunca se trabaja directamente sobre ella.
- `feat/<tema>` — rama corta por tema o sección (ej. `feat/hero-mejoras`, `feat/especialidad-mejoras`). Nace de `main` y se elimina al fusionarse.

## Convención de commits

Formato: `tipo(ámbito): descripción`, en español, en minúsculas y sin punto final.

Tipos usados:

| Tipo    | Uso                                              |
| ------- | ------------------------------------------------ |
| `feat`  | Nueva funcionalidad o mejora visual              |
| `fix`   | Corrección de un bug o de un cambio no deseado   |
| `docs`  | Documentación                                    |
| `chore` | Mantenimiento (dependencias, .gitignore, etc.)   |

Ejemplos:

```
feat(Hero): luz naranja más clara y ángulos simétricos de cámara
fix(Hero): quitar hint de controles
docs(PROMPT_CONTEXT): registrar decisiones del Hero
```

## Ciclo de trabajo

1. Partir de `main` actualizada: `git checkout main && git pull`
2. Crear rama: `git checkout -b feat/<tema>`
3. Hacer commits pequeños y verificados (el build debe pasar antes de cada commit).
4. Al terminar y quedar aprobado: fusionar a `main` y hacer push.
5. Borrar la rama local: `git branch -d feat/<tema>`

## Checkpoints

- Usamos `git tag` para marcar puntos de restauración (ej. `hero-v1`).
- Volver a un checkpoint: `git reset --hard <tag>` o `git checkout <tag>`.

## Comandos útiles

```bash
git status                  # estado actual
git checkout -b feat/x      # crear rama y moverse a ella
git add .                   # preparar cambios
git commit -m "feat(...): ..."
git checkout main
git merge feat/x            # fusionar (fast-forward si main no se movió)
git push origin main        # subir a GitHub
git tag vX.Y                # marcar un checkpoint
git log --oneline           # historial resumido
```

## Estado actual

- Rama activa: `feat/especialidad-mejoras`
- Último merge a `main`: Hero completo.
- Tags: `hero-v1`
