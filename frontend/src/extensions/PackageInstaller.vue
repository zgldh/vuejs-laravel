<script>
  import AdminRoutesProvider from 'extensions/AdminRoutesProvider'
  import AdminNavigatorsProvider from 'extensions/AdminNavigatorsProvider'

  var vm = null
  var PackageInstaller = {
    installApp: function (AppVm) {
      vm = AppVm
      AdminRoutesProvider.installApp(vm)
      AdminNavigatorsProvider.installApp(vm)
    },
    installPackages: function (packages) {
      for (var i = 0; i < packages.length; i++) {
        PackageInstaller.installPackage(packages[i])
      }
    },
    installPackage: function (packageConfig) {
      if (packageConfig.admin) {
        PackageInstaller.admin(packageConfig.admin)
      }

      vm.$dispatch('onPackageInstalled', packageConfig)
      vm.$broadcast('onPackageInstalled', packageConfig)
    },
    admin: function (adminConfig) {
      if (adminConfig.navigators) {
        AdminNavigatorsProvider.setNavigators(adminConfig.navigators)
      }
      if (adminConfig.routes) {
        AdminRoutesProvider.setRoutesConfig(adminConfig.routes)
      }
    }
  }

  export default PackageInstaller
</script>
