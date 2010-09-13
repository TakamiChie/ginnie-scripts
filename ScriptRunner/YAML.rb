require "yaml"
require "pp"
require "nkf"
open(ARGV[0]){|io|
  print NKF.nkf("-sxm0", YAML.load(io).pretty_inspect)
}
