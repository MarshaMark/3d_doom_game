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
browserEvents.Four.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Autogun"
    textSprite.setText("Autogun")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
function SetupStaminaBar () {
    StaminaBar = statusbars.create(60, 5, StatusBarKind.Stamina)
    StaminaBar.setColor(5, 14, 4)
    StaminaBar.max = 300
    StaminaBar.value = StaminaBar.max
    StaminaBar.setOffsetPadding(31, 2)
    StaminaBar.positionDirection(CollisionDirection.Bottom)
    StaminaBar.setBarBorder(1, 15)
    StaminaBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    StaminaBar.setLabel("Sta", 5)
}
function SetupExosuitBar () {
    ExosuitBar = statusbars.create(60, 5, StatusBarKind.SuitBar)
    ExosuitBar.setColor(3, 11, 6)
    ExosuitBar.max = 1
    ExosuitBar.value = 0
    ExosuitBar.setOffsetPadding(-49, 9)
    ExosuitBar.positionDirection(CollisionDirection.Bottom)
    ExosuitBar.setBarBorder(1, 15)
    ExosuitBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    ExosuitBar.setStatusBarFlag(StatusBarFlag.LabelAtEnd, true)
    ExosuitBar.setLabel("Exo", 12)
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
    tiles.setCurrentTilemap(tilemap`TstMap04`)
    scene.setBackgroundImage(assets.image`BG`)
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
        Exosuit = sprites.create(assets.image`ExosuitPlaced`, SpriteKind.Suit)
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
function SetupPlayer () {
    Camera = Render.getRenderSpriteVariable()
    tiles.placeOnTile(Camera, tiles.getTileLocation(2, 3))
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
scene.onHitWall(SpriteKind.Bullet, function (sprite, location) {
    if (randint(0, 1) == 0) {
        sprite.setBounceOnWall(true)
    } else {
        sprites.destroy(sprite)
    }
})
function SetupExosuit () {
    Exosuit = sprites.create(assets.image`Exosuit`, SpriteKind.Suit)
    tiles.placeOnTile(Exosuit, tiles.getTileLocation(1, 2))
    InSuit = false
}
function Setup () {
    SetupMap()
    SetupPlayer()
    SetupUI()
    SetupExosuit()
    Game = true
}
function SetupUI () {
    Gun = sprites.create(assets.image`Nothingness`, SpriteKind.UI)
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
    BarUI = sprites.create(assets.image`UIhudBar`, SpriteKind.UI)
    BarUI.setFlag(SpriteFlag.RelativeToCamera, true)
    BarUI.y = 112
    textSprite = textsprite.create("e", 15, 3)
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.setFlag(SpriteFlag.Invisible, true)
    textSprite.setPosition(62, 96)
    textSprite.setMaxFontHeight(8)
    SetupBars()
}
function SetupHealthBar () {
    HealthBar = statusbars.create(60, 5, StatusBarKind.Health)
    HealthBar.setColor(7, 12, 2)
    HealthBar.max = 20
    HealthBar.value = HealthBar.max
    HealthBar.setOffsetPadding(-49, 2)
    HealthBar.positionDirection(CollisionDirection.Bottom)
    HealthBar.setBarBorder(1, 15)
    HealthBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    HealthBar.setStatusBarFlag(StatusBarFlag.LabelAtEnd, true)
    HealthBar.setLabel("H/S", 7)
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
        Explosion = sprites.create(assets.image`Explosion`, SpriteKind.EnvDmg)
        Explosion.setPosition(Sprite2.x, Sprite2.y)
        sprites.destroy(Explosion, effects.fire, 500)
        sprites.destroy(Sprite2)
    }
    if (Type == "Explosion" && TypeID == 2) {
        Explosion = sprites.create(assets.image`MiniExplosion`, SpriteKind.EnvDmg)
        Explosion.setPosition(Sprite2.x, Sprite2.y)
        sprites.destroy(Explosion, effects.fire, 500)
        sprites.destroy(Sprite2)
    }
}
function SetupManaBar () {
    ManaBar = statusbars.create(60, 5, StatusBarKind.Magic)
    ManaBar.setColor(9, 8, 6)
    ManaBar.max = 30
    ManaBar.value = ManaBar.max
    ManaBar.setOffsetPadding(31, 9)
    ManaBar.positionDirection(CollisionDirection.Bottom)
    ManaBar.setBarBorder(1, 15)
    ManaBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
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
browserEvents.Five.onEvent(browserEvents.KeyEvent.Pressed, function () {
    EquippedGun = "Machinegun"
    textSprite.setText("Machine gun")
    textSprite.setFlag(SpriteFlag.Invisible, false)
})
function SetupShieldBar () {
    ShieldBar = statusbars.create(58, 3, StatusBarKind.Energy)
    ShieldBar.setColor(10, 0, 12)
    ShieldBar.max = 10
    ShieldBar.value = ShieldBar.max
    ShieldBar.setOffsetPadding(-49, 3)
    ShieldBar.positionDirection(CollisionDirection.Bottom)
    ShieldBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
}
let Bullet: Sprite = null
let Missile: Sprite = null
let Laser: Sprite = null
let Speed = 0
let Zoom = false
let SuperZoom = false
let ShieldBar: StatusBarSprite = null
let ManaBar: StatusBarSprite = null
let Explosion: Sprite = null
let HealthBar: StatusBarSprite = null
let BarUI: Sprite = null
let Crosshair: Sprite = null
let Gun: Sprite = null
let Exosuit: Sprite = null
let SuperSpeed = false
let Camera: Sprite = null
let InSuit = false
let ExosuitBar: StatusBarSprite = null
let StaminaBar: StatusBarSprite = null
let textSprite: TextSprite = null
let EquippedGun = ""
let Game = false
Setup()
Game = false
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
        Gun.setImage(assets.image`Pistol`)
        Gun.setPosition(80, 80)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Rifle") {
        Gun.setImage(assets.image`Rifle`)
        Gun.setPosition(80, 86)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Shotgun") {
        Gun.setImage(assets.image`Shotgun`)
        Gun.setPosition(80, 86)
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
            ..............cc................
            .............cbbc...............
            .............cbbc...............
            .............cccc...............
            ............fcbbc...............
            ...........fdcbbc...............
            ..........fddcbbc...............
            .........feedcccc...............
            .........feedcbbc...............
            ........feeefcbbc...............
            ........feef.cbbc...............
            ........feef.cbbc...............
            .......feeef.cbbc...............
            .......feeef.cbbc...............
            .......feeef.cbbcf..............
            .......feef..f1dd1f.............
            .......feef..fddddf.............
            .......feef..feddef.............
            ......feeef..feeeef.............
            ......feeef...feeef.............
            ......feef....feeeef............
            ......feef.....feeef............
            ......feef.....feeef............
            ......feef.....feeef............
            `)
        Gun.setPosition(80, 86)
        Gun.setScale(2, ScaleAnchor.Middle)
    } else if (EquippedGun == "Machinegun") {
        Gun.setImage(assets.image`Autogun`)
        Gun.setPosition(80, 86)
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
    if (browserEvents.Q.isPressed() && InSuit) {
        Laser = sprites.create(assets.image`Laser`, SpriteKind.Laser)
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
    if (browserEvents.E.isPressed() && InSuit) {
        Missile = sprites.create(assets.image`Rocket`, SpriteKind.Missle)
        Missile.setPosition(Camera.x, Camera.y)
        Missile.setVelocity(Render.getAttribute(Render.attribute.dirX) * 80, Render.getAttribute(Render.attribute.dirY) * 80)
        Render.setSpriteAttribute(Missile, RCSpriteAttribute.ZOffset, 3)
        browserEvents.E.pauseUntil(browserEvents.KeyEvent.Released)
    }
})
forever(function () {
    if (browserEvents.MouseLeft.isPressed()) {
        Bullet = sprites.create(assets.image`Bullet`, SpriteKind.Bullet)
        Bullet.setPosition(Camera.x, Camera.y)
        Bullet.setVelocity(Render.getAttribute(Render.attribute.dirX) * 200, Render.getAttribute(Render.attribute.dirY) * 200)
        Render.setSpriteAttribute(Bullet, RCSpriteAttribute.ZOffset, 2)
        browserEvents.MouseLeft.pauseUntil(browserEvents.MouseButtonEvent.Released)
    }
})
