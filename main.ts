namespace SpriteKind {
    export const UI = SpriteKind.create()
    export const Suit = SpriteKind.create()
    export const Bullet = SpriteKind.create()
    export const Missle = SpriteKind.create()
    export const EnvDmg = SpriteKind.create()
    export const Laser = SpriteKind.create()
}
namespace StatusBarKind {
    export const Stamina = StatusBarKind.create()
    export const SuitBar = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Missle, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    if (sprites.readDataNumber(otherSprite, "Health") <= 0) {
        sprites.destroy(otherSprite)
    }
    CreateEnvDmg("Explosion", 1, sprite)
})
browserEvents.Four.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Autogun"
    textSprite.setText("Autogun")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    if (sprites.readDataNumber(otherSprite, "Health") <= 0) {
        sprites.destroy(otherSprite)
    }
    sprites.destroy(sprite)
})
function SetupStaminaBar () {
    StaminaBar = statusbars.create(60, 4, StatusBarKind.Stamina)
    StaminaBar.setColor(5, 14, 4)
    StaminaBar.max = 300
    StaminaBar.value = StaminaBar.max
    StaminaBar.setOffsetPadding(31, 6)
    StaminaBar.positionDirection(CollisionDirection.Bottom)
    StaminaBar.setBarBorder(1, 15)
    StaminaBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    StaminaBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true)
    StaminaBar.setLabel("Sta", 5)
}
function SetupExosuitBar () {
    ExosuitBar = statusbars.create(158, 6, StatusBarKind.SuitBar)
    ExosuitBar.setColor(3, 11, 6)
    ExosuitBar.max = 1
    ExosuitBar.value = 0
    ExosuitBar.setOffsetPadding(0, 1)
    ExosuitBar.positionDirection(CollisionDirection.Top)
    ExosuitBar.setBarBorder(1, 15)
    ExoBarText = sprites.create(img`
        c c c . . . . . . . . . 
        c c . . c . c . . c c . 
        c . . . . c . . c . . c 
        c c c . c . c . . c c . 
        `, SpriteKind.UI)
    ExoBarText.setFlag(SpriteFlag.RelativeToCamera, true)
    ExoBarText.setPosition(80, 4)
}
scene.onHitWall(SpriteKind.Missle, function (sprite, location) {
    CreateEnvDmg("Explosion", 1, sprite)
})
scene.onHitWall(SpriteKind.Laser, function (sprite, location) {
    CreateEnvDmg("Explosion", 2, sprite)
})
function SetupBars () {
    SetupHealthBar()
    SetupShieldBar()
    SetupStaminaBar()
    SetupManaBar()
    SetupExosuitBar()
}
function SetupMap () {
    Map = randint(0, 2)
    if (Map == 0) {
        tiles.setCurrentTilemap(tilemap`TstMap04`)
        SetupExosuit(1, 2)
        SetupPlayer(2, 3)
    } else if (Map == 1) {
        tiles.setCurrentTilemap(tilemap`TstMap02`)
        SetupExosuit(9, 1)
        SetupPlayer(4, 3)
    } else if (Map == 2) {
        tiles.setCurrentTilemap(tilemap`TstMap03`)
        SetupExosuit(8, 12)
        SetupPlayer(3, 12)
    }
    scene.setBackgroundImage(img`
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        `)
}
function DoExosuit (Enter: boolean) {
    if (Enter) {
        InSuit = true
        Render.setSpriteAttribute(Camera, RCSpriteAttribute.ZOffset, 4)
        Render.setAttribute(Render.attribute.fov, 1.85)
        SuperSpeed = true
        StaminaBar.max = 500
        StaminaBar.setLabel("Aux", 5)
        ExosuitBar.max = 32
        ExosuitBar.value = 32
        Camera.setPosition(Exosuit.x, Exosuit.y)
        sprites.destroy(Exosuit)
    } else {
        Exosuit = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . c c . . c c . . . . . 
            . . . . . c c b b c c . . . . . 
            . . . . . c b 6 9 b c . . . . . 
            . . . . . c b 8 6 b c . . . . . 
            . . . . . . c b b c . . . . . . 
            . . . . . e c c c c e . . . . . 
            . . . . . c e c e e c . . . . . 
            . . . . c . . e c . . c . . . . 
            . . . . c . . c e . . c . . . . 
            . . . . . . . e c . . . . . . . 
            . . . . . . e c c e . . . . . . 
            . . . . . . c e e c . . . . . . 
            . . . . . . c . . c . . . . . . 
            . . . . . . c . . c . . . . . . 
            . . . . . c c . . c c . . . . . 
            `, SpriteKind.Suit)
        Exosuit.setPosition(Camera.x, Camera.y)
        Render.setSpriteAttribute(Camera, RCSpriteAttribute.ZOffset, 3)
        Render.setAttribute(Render.attribute.fov, 1.5)
        SuperSpeed = false
        StaminaBar.max = 300
        StaminaBar.setLabel("Sta", 5)
        ExosuitBar.max = 1
        ExosuitBar.value = 0
        InSuit = false
    }
}
sprites.onOverlap(SpriteKind.Laser, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    if (sprites.readDataNumber(otherSprite, "Health") <= 0) {
        sprites.destroy(otherSprite)
    }
    CreateEnvDmg("Explosion", 2, sprite)
})
function SetupPlayer (Col: number, Row: number) {
    Camera = Render.getRenderSpriteVariable()
    tiles.placeOnTile(Camera, tiles.getTileLocation(Col, Row))
    SuperSpeed = false
    Render.setAttribute(Render.attribute.fov, 1.5)
    Render.setAttribute(Render.attribute.wallZScale, 1.75)
    Render.setSpriteAttribute(Camera, RCSpriteAttribute.ZOffset, 2)
}
browserEvents.Three.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Shotgun"
    textSprite.setText("Shotgun")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
scene.onHitWall(SpriteKind.Bullet, function (sprite, location) {
    if (randint(0, 1) == 0) {
        sprite.setBounceOnWall(true)
    } else {
        sprites.destroy(sprite)
    }
})
function SetupExosuit (Col: number, Row: number) {
    Exosuit = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . c c . . c c . . . . . 
        . . . . . c c b b c c . . . . . 
        . . . . . c b 6 9 b c . . . . . 
        . . . . . c b 8 6 b c . . . . . 
        . . . . . . c b b c . . . . . . 
        . . . . . e c c c c e . . . . . 
        . . . . . c e c e e c . . . . . 
        . . . . c . . e c . . c . . . . 
        . . . . c . . c e . . c . . . . 
        . . . . . . . e c . . . . . . . 
        . . . . . . e c c e . . . . . . 
        . . . . . . c e e c . . . . . . 
        . . . . . . c . . c . . . . . . 
        . . . . . . c . . c . . . . . . 
        . . . . . c c . . c c . . . . . 
        `, SpriteKind.Suit)
    tiles.placeOnTile(Exosuit, tiles.getTileLocation(Col, Row))
    InSuit = false
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (ShieldBar.value > 0) {
        ShieldBar.value += sprites.readDataNumber(sprite, "Damage")
    } else {
        HealthBar.value += sprites.readDataNumber(sprite, "Damage")
    }
    if (sprites.readDataNumber(sprite, "Health") <= 0) {
        sprites.destroy(sprite)
    }
    sprites.changeDataNumberBy(sprite, "Health", -2)
})
function Setup () {
    SetupMap()
    SetupUI()
    Game = true
}
function SetupUI () {
    Gun = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.UI)
    EquippedGun = "Pistol"
    Gun.setFlag(SpriteFlag.RelativeToCamera, true)
    Crosshair = sprites.create(img`
        . . . . . . . . . 
        . . . 3 3 3 . . . 
        . . . . . . . . . 
        . 3 . 2 . 2 . 3 . 
        . 3 . . 2 . . 3 . 
        . 3 . 2 . 2 . 3 . 
        . . . . . . . . . 
        . . . 3 3 3 . . . 
        . . . . . . . . . 
        `, SpriteKind.UI)
    Crosshair.setFlag(SpriteFlag.RelativeToCamera, true)
    BarUI = sprites.create(img`
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        `, SpriteKind.UI)
    BarUI.setFlag(SpriteFlag.RelativeToCamera, true)
    BarUI.y = 114
    ExoBarUI = sprites.create(img`
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `, SpriteKind.UI)
    ExoBarUI.setFlag(SpriteFlag.RelativeToCamera, true)
    ExoBarUI.setPosition(80, 4)
    textSprite = textsprite.create("e", 15, 3)
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.setFlag(SpriteFlag.Invisible, true)
    textSprite.setPosition(62, 96)
    textSprite.setMaxFontHeight(8)
    SetupBars()
}
function SetupHealthBar () {
    HealthBar = statusbars.create(66, 4, StatusBarKind.Health)
    HealthBar.setColor(7, 12, 2)
    HealthBar.max = 64
    HealthBar.value = HealthBar.max
    HealthBar.setOffsetPadding(-46, 1)
    HealthBar.positionDirection(CollisionDirection.Bottom)
    HealthBar.setBarBorder(1, 15)
    HealthBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    HealthBar.setStatusBarFlag(StatusBarFlag.LabelAtEnd, true)
    HealthBar.setLabel("HP", 7)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    Render.toggleViewMode()
    if (Render.isViewMode(ViewMode.tilemapView)) {
        Gun.setFlag(SpriteFlag.Invisible, true)
    } else {
        Gun.setFlag(SpriteFlag.Invisible, false)
    }
})
function CreateEnvDmg (Type: string, TypeID: number, Sprite2: Sprite) {
    if (Type == "Explosion" && TypeID == 1) {
        Explosion = sprites.create(img`
            5 . . 5 . . . 5 . . . 5 . . 5 
            . 5 . . 5 5 5 5 5 5 5 . . 5 . 
            . . 5 5 5 5 4 5 5 4 5 5 5 . . 
            5 . 5 5 4 5 4 4 4 4 4 5 5 . 5 
            . 5 5 5 4 4 4 4 4 4 5 5 5 5 . 
            . 5 4 4 4 4 4 4 4 4 4 4 5 5 . 
            . 5 5 4 5 4 2 2 2 4 4 4 4 5 . 
            . 5 5 5 4 2 2 2 2 2 5 4 5 5 5 
            . 5 5 5 4 4 4 2 2 4 4 5 5 5 . 
            . 5 5 4 4 4 4 2 4 4 4 4 5 5 . 
            . 5 5 4 4 5 4 4 4 4 5 4 5 5 . 
            5 . 5 5 4 5 4 4 4 5 4 5 5 . 5 
            . . 5 5 5 5 5 4 5 5 5 5 5 . . 
            . 5 . . 5 5 5 5 5 5 5 . . 5 . 
            5 . . 5 . . . . . . . 5 . . 5 
            `, SpriteKind.EnvDmg)
        Explosion.setPosition(Sprite2.x, Sprite2.y)
        pause(100)
        sprites.destroy(Explosion, effects.fire, 650)
        sprites.destroy(Sprite2)
    }
    if (Type == "Explosion" && TypeID == 2) {
        Explosion = sprites.create(img`
            5 . . . 5 . . . 5 
            . 5 5 5 5 4 5 5 . 
            . 4 5 4 4 4 4 5 . 
            . 5 4 5 4 4 5 5 . 
            5 5 5 4 2 4 4 5 5 
            . 5 4 4 4 4 4 5 . 
            . 5 5 4 5 4 5 4 . 
            . 5 5 5 5 5 5 5 . 
            5 . . . 5 . . . 5 
            `, SpriteKind.EnvDmg)
        Explosion.setPosition(Sprite2.x, Sprite2.y)
        pause(100)
        sprites.destroy(Explosion, effects.fire, 300)
        sprites.destroy(Sprite2)
    }
}
function SetupManaBar () {
    ManaBar = statusbars.create(60, 4, StatusBarKind.Magic)
    ManaBar.setColor(9, 8, 6)
    ManaBar.max = 30
    ManaBar.value = ManaBar.max
    ManaBar.setOffsetPadding(-49, 6)
    ManaBar.positionDirection(CollisionDirection.Bottom)
    ManaBar.setBarBorder(1, 15)
    ManaBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    ManaBar.setStatusBarFlag(StatusBarFlag.LabelAtEnd, true)
    ManaBar.setLabel("Mag", 9)
}
browserEvents.Two.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Rifle"
    textSprite.setText("Rifle")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Pistol"
    textSprite.setText("Pistol")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
sprites.onOverlap(SpriteKind.EnvDmg, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    if (sprites.readDataNumber(otherSprite, "Health") <= 0) {
        sprites.destroy(otherSprite)
    }
})
browserEvents.Five.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Machinegun"
    textSprite.setText("Machine gun")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
function SetupShieldBar () {
    ShieldBar = statusbars.create(66, 4, StatusBarKind.Energy)
    ShieldBar.setColor(10, 0, 12)
    ShieldBar.max = 32
    ShieldBar.value = ShieldBar.max
    ShieldBar.setOffsetPadding(34, 1)
    ShieldBar.positionDirection(CollisionDirection.Bottom)
    ShieldBar.setBarBorder(1, 15)
    ShieldBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    ShieldBar.setStatusBarFlag(StatusBarFlag.InvertFillDirection, true)
    ShieldBar.setLabel("SP", 10)
}
let Bullet: Sprite = null
let Missile: Sprite = null
let Speed = 0
let Laser: Sprite = null
let Zoom = false
let SuperZoom = false
let mySprite: Sprite = null
let ManaBar: StatusBarSprite = null
let Explosion: Sprite = null
let ExoBarUI: Sprite = null
let BarUI: Sprite = null
let Crosshair: Sprite = null
let Gun: Sprite = null
let HealthBar: StatusBarSprite = null
let ShieldBar: StatusBarSprite = null
let Exosuit: Sprite = null
let SuperSpeed = false
let Camera: Sprite = null
let InSuit = false
let Map = 0
let ExoBarText: Sprite = null
let ExosuitBar: StatusBarSprite = null
let StaminaBar: StatusBarSprite = null
let textSprite: TextSprite = null
let EquippedGun = ""
let Game = false
Setup()
Game = false
game.onUpdateInterval(randint(1000, 5000), function () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . 2 . . 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . 2 . . 2 2 . . . . . 
        . . . . . 2 2 . . . 2 2 . . . . 
        . . . . . 2 . . . . . 2 . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(mySprite, assets.tile`Spawner`)
    sprites.setDataNumber(mySprite, "Health", 3)
    sprites.setDataNumber(mySprite, "Damage", -2)
    mySprite.follow(Camera, 30)
})
forever(function () {
    if (browserEvents.X.isPressed()) {
        SuperZoom = !(SuperZoom)
        if (SuperZoom) {
            Render.setAttribute(Render.attribute.fov, 0.2)
        } else {
            if (InSuit) {
                Render.setAttribute(Render.attribute.fov, 1.85)
            } else {
                Render.setAttribute(Render.attribute.fov, 1.5)
            }
        }
        pauseUntil(() => !(browserEvents.X.isPressed()))
    }
})
forever(function () {
    if (EquippedGun == "Pistol") {
        Gun.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...............cc...............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            .............f1dd1f.............
            .............fddddf.............
            .............feddef.............
            .............feeeef.............
            ..............feeef.............
            ..............feeeef............
            ...............feeef............
            `)
        Gun.setPosition(80, 80)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Rifle") {
        Gun.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...............cc...............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            ..............cbbc..............
            .............fcbbc..............
            ............fdcbbc..............
            ...........fddcbbc..............
            ..........feedcbbc..............
            ..........feedcbbc..............
            .........feeefcbbc..............
            .........feef.cbbc..............
            .........feef.cbbc..............
            ........feeef.cbbcf.............
            ........feeef.f1dd1f............
            ........feef..fddddf............
            ........feef..feddef............
            ........feef..feeeef............
            .......feeef...feeef............
            .......feeef...feeeef...........
            .......feef.....feeef...........
            .......feef.....feeef...........
            .......feef.....feeef...........
            `)
        Gun.setPosition(80, 88)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Shotgun") {
        Gun.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...............ccc..............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            .............fccccc.............
            ............fdccbcc.............
            ...........feecbbbc.............
            ...........feeccccc.............
            ..........feeecbbbc.............
            ..........feefcbbbc.............
            ..........feefcbbbc.............
            .........feeefcbbbc.............
            .........feeeff1dd1f............
            .........feef.fddddf............
            .........feef.feddef............
            .........feef.feeeef............
            ........feeef..feeef............
            ........feeef..feeeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            `)
        Gun.setPosition(80, 88)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Autogun") {
        Gun.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...............cc...............
            ..............cbbc..............
            ..............cbbc..............
            ..............cccc..............
            ..............cbbc..............
            .............fcbbc..............
            ............fdcbbc..............
            ...........feecccc..............
            ...........feecbbc..............
            ..........feeecbbc..............
            ..........feefcbbc..............
            ..........feefcbbc..............
            .........feeefcbbc..............
            .........feeefcbbc..............
            .........feeefcbbcf.............
            .........feef.f1dd1f............
            .........feef.fddddf............
            .........feef.feddef............
            ........feeef.feeeef............
            ........feeef..feeef............
            ........feef...feeeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            `)
        Gun.setPosition(80, 88)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Machinegun") {
        Gun.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...............ccc..............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            ..............cbbbc.............
            .............fcc6cc.............
            ............fdccccc.............
            ...........feeccacc.............
            ...........feeccccc.............
            ..........feeecc6cc.............
            ..........feefcbbbc.............
            ..........feefcbbbc.............
            .........feeefcbbbc.............
            .........feeefcbbbc.............
            .........feeefcbbbc.............
            .........feef.f1dd1f............
            .........feef.fddddf............
            .........feef.feddef............
            ........feeef.feeeef............
            ........feeef..feeef............
            ........feef...feeeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            ........feef....feeef...........
            `)
        Gun.setPosition(80, 88)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else {
    	
    }
})
forever(function () {
    if (browserEvents.Z.isPressed()) {
        Zoom = !(Zoom)
        if (Zoom) {
            Render.setAttribute(Render.attribute.fov, 0.6)
        } else {
            if (InSuit) {
                Render.setAttribute(Render.attribute.fov, 1.85)
            } else {
                Render.setAttribute(Render.attribute.fov, 1.5)
            }
        }
        pauseUntil(() => !(browserEvents.Z.isPressed()))
    }
})
forever(function () {
    if (!(browserEvents.One.isPressed() || (browserEvents.Two.isPressed() || (browserEvents.Three.isPressed() || (browserEvents.Four.isPressed() || (browserEvents.Five.isPressed() || (browserEvents.Six.isPressed() || (browserEvents.Seven.isPressed() || (browserEvents.Eight.isPressed() || browserEvents.Nine.isPressed()))))))))) {
        textSprite.setFlag(SpriteFlag.Invisible, true)
    }
})
forever(function () {
    if (browserEvents.F.isPressed()) {
        if (Camera.overlapsWith(Exosuit)) {
            DoExosuit(true)
        } else if (InSuit) {
            DoExosuit(false)
        }
        pauseUntil(() => !(browserEvents.F.isPressed()))
    }
})
forever(function () {
    if (browserEvents.Q.isPressed() && InSuit) {
        Laser = sprites.create(img`
            2 
            `, SpriteKind.Laser)
        Laser.setPosition(Camera.x, Camera.y)
        Laser.setVelocity(Render.getAttribute(Render.attribute.dirX) * 800, Render.getAttribute(Render.attribute.dirY) * 800)
        Render.setSpriteAttribute(Laser, RCSpriteAttribute.ZOffset, 4)
        browserEvents.Q.pauseUntil(browserEvents.KeyEvent.Released)
    }
})
forever(function () {
    if (browserEvents.Space.isPressed()) {
        if (InSuit) {
            Render.jump(Camera, 80)
        } else {
            Render.jump(Camera, 60)
        }
        pauseUntil(() => !(browserEvents.Space.isPressed()))
    }
})
forever(function () {
    Render.moveWithController(Speed, 3, Speed / 2.5 + 0.5)
    if (browserEvents.Shift.isPressed() && StaminaBar.value > 4 && (browserEvents.W.isPressed() || browserEvents.S.isPressed())) {
        if (SuperSpeed) {
            Speed = 4
            StaminaBar.value += -5
        } else {
            Speed = 3
            StaminaBar.value += -3
        }
        pause(25)
    } else {
        Speed = 2
        StaminaBar.value += 2
        if (InSuit) {
            StaminaBar.value += 2
        }
        pause(15)
    }
    if (StaminaBar.value <= 6) {
        pause(100)
    }
    if (Game) {
    	
    }
})
forever(function () {
    if (browserEvents.E.isPressed() && InSuit) {
        Missile = sprites.create(img`
            . 5 c c c 5 . 
            c c 5 4 5 c c 
            5 5 4 4 4 4 5 
            c 5 4 2 4 5 c 
            5 4 4 4 4 5 5 
            c 5 5 5 4 c c 
            . 5 c 5 c 5 . 
            `, SpriteKind.Missle)
        Missile.setPosition(Camera.x, Camera.y)
        Missile.setVelocity(Render.getAttribute(Render.attribute.dirX) * 80, Render.getAttribute(Render.attribute.dirY) * 80)
        Render.setSpriteAttribute(Missile, RCSpriteAttribute.ZOffset, 3)
        browserEvents.E.pauseUntil(browserEvents.KeyEvent.Released)
    }
})
forever(function () {
    if (browserEvents.MouseLeft.isPressed()) {
        Bullet = sprites.create(img`
            2 2 
            2 2 
            `, SpriteKind.Bullet)
        Bullet.setPosition(Camera.x, Camera.y)
        Bullet.setVelocity(Render.getAttribute(Render.attribute.dirX) * 200, Render.getAttribute(Render.attribute.dirY) * 200)
        Render.setSpriteAttribute(Bullet, RCSpriteAttribute.ZOffset, 2)
        browserEvents.MouseLeft.pauseUntil(browserEvents.MouseButtonEvent.Released)
    }
})
forever(function () {
    if (ShieldBar.value < ShieldBar.max && InSuit && ExosuitBar.value >= 3) {
        ShieldBar.value += 2
        ExosuitBar.value += -3
        pause(800)
    } else {
        if (InSuit) {
            ExosuitBar.value += 1
            pause(250)
        } else {
        	
        }
    }
})
