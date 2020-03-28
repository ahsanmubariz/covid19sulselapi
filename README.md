# API

Project iseng-iseng belajar scraping dari web

## Getting Started

Using data from covid19.sulselprov.go.id 

## How To Use

Data sebaran

```
http://localhost:3000/datasebaran
```
result will be
```
{
    odp:[array of odp],
    pdp:[array of pdp],
    positif:[array of positif]
}
```

Data RS Rujukan

```
http://localhost:3000/rujukan
```
result will be
```
{
    rujukan:[array of rs rujukan]
}
```

Data per kabupaten

```
http://localhost:3000/datakab
```
result will be
```
{
    datakab:[array of data pasien per kabupaten]
}
```

### Prerequisites

you need

- node.js
- npm

### Installing
- npm install

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* Ahsan Mubariz (https://github.com/ahsanmubariz)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
