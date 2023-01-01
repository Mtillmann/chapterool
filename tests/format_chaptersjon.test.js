import {ChaptersJson} from "../src/Formats/ChaptersJson.js";
import {readFileSync} from "fs";
import {sep} from "path";
import {Youtube} from "../src/Formats/Youtube.js";

describe('ChaptersJson Format Handler', () => {
    it('accepts no arguments', () => {
        expect(() => {
            new ChaptersJson();
        }).not.toThrowError(TypeError);
    });

    it('fails on malformed input', () => {
        expect(() => {
            new ChaptersJson('asdf');
        }).toThrowError(Error);
    });

    const content = readFileSync(module.path + sep + 'samples' + sep + 'chapters.json', 'utf-8');

    it('parses well-formed input', () => {
        expect(() => {
            new ChaptersJson(content);
        }).not.toThrow(Error);
    });

    const instance = new ChaptersJson(content);

    it('has the correct number of chapters from content', () => {
        expect(instance.chapters.length).toEqual(26);
    });

    it('has the correct title from content', () => {
        expect(instance.meta.title).toEqual('this is a episode title!');
    });

    it('has parsed the timestamps correctly', () => {
        expect(instance.chapters[0].startTime).toBe(6.202)
    });

    it('has parsed the chapter titles correctly', () => {
        expect(instance.chapters[0].title).toBe('Chapter 1 of 26')
    });

    it('exports to correct format',() => {
        expect(instance.toString().slice(0,1)).toEqual('{');
    });

    it('export includes correct timestamp',() => {
        expect(instance.toString()).toContain('658.242');
    });

    it('can import previously generated export',() => {
        expect(new ChaptersJson(instance.toString()).chapters[3].endTime).toEqual(542.001);
    });

    it('can convert into other format', () => {
        expect(instance.to(Youtube)).toBeInstanceOf(Youtube)
    });

});
